"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MicIcon, StopCircleIcon, PlayIcon, TrashIcon, PauseIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

interface VoiceRecorderProps {
  onRecorded: (blob: Blob) => void
}

export default function VoiceRecorder({ onRecorded }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(20).fill(5))

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onplay = () => setIsPlaying(true)
      audioRef.current.onpause = () => setIsPlaying(false)
      audioRef.current.onended = () => setIsPlaying(false)
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close()
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Set up audio context for visualizer
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)
      sourceRef.current.connect(analyserRef.current)

      // Start visualizer animation
      updateVisualizer()

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const url = URL.createObjectURL(audioBlob)
        setAudioBlob(audioBlob)
        setAudioUrl(url)
        onRecorded(audioBlob)

        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
        }

        // Stop visualizer
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      setPermissionDenied(false)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      setPermissionDenied(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const deleteAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioBlob(null)
    setAudioUrl(null)
    setRecordingTime(0)
    onRecorded(new Blob()) // Send empty blob to parent
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const updateVisualizer = () => {
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const update = () => {
        if (!isRecording) return

        analyserRef.current!.getByteFrequencyData(dataArray)

        // Sample the frequency data to get 20 data points for visualization
        const sampleSize = Math.floor(bufferLength / 20)
        const sampledData = Array(20)
          .fill(0)
          .map((_, i) => {
            const start = i * sampleSize
            const end = start + sampleSize
            let sum = 0
            for (let j = start; j < end; j++) {
              sum += dataArray[j]
            }
            // Scale the value to be between 5 and 50
            return 5 + (sum / sampleSize / 255) * 45
          })

        setVisualizerData(sampledData)
        animationRef.current = requestAnimationFrame(update)
      }

      animationRef.current = requestAnimationFrame(update)
    }
  }

  return (
    <div className="space-y-4 p-6 bg-gradient-to-b from-blue-50 to-white rounded-lg border border-blue-100 shadow-sm">
      {permissionDenied && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Microphone access was denied. Please allow microphone access to record a voice message.
          </AlertDescription>
        </Alert>
      )}

      {isRecording ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center h-16 gap-1 bg-blue-900/10 px-6 py-3 rounded-full">
              {visualizerData.map((value, index) => (
                <motion.div
                  key={index}
                  className="w-1.5 bg-gradient-to-t from-blue-700 to-blue-400 rounded-full"
                  animate={{ height: `${value}px` }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-semibold text-red-500">{formatTime(recordingTime)}</div>
            <div className="text-sm text-gray-500 flex items-center justify-center">
              <span className="inline-block h-2 w-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
              Recording...
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="destructive"
              size="lg"
              className="rounded-full shadow-lg hover:shadow-md transition-shadow"
              onClick={stopRecording}
            >
              <StopCircleIcon className="h-6 w-6 mr-2" />
              Stop Recording
            </Button>
          </div>
        </div>
      ) : audioUrl ? (
        <div className="space-y-4">
          <audio ref={audioRef} src={audioUrl} className="hidden" />

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium text-blue-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                Voice Message ({formatTime(recordingTime)})
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-blue-200 hover:bg-blue-50"
                  onClick={playAudio}
                >
                  {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
                  onClick={deleteAudio}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative h-12 bg-blue-100 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ width: isPlaying ? "100%" : "0%", transition: "width 0.1s linear" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  {Array(20)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-6 bg-white rounded-full"
                        style={{
                          height: `${Math.random() * 16 + 8}px`,
                          opacity: isPlaying ? 1 : 0.5,
                          transition: "height 0.2s ease",
                        }}
                      ></div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center shadow-md">
                <MicIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-800">Voice message ready to send</div>
                <div className="text-xs text-gray-500">Click the button below to send your message</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">
              Click the button below to start recording your voice message
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="default"
              size="lg"
              className="rounded-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-md transition-shadow"
              onClick={startRecording}
            >
              <MicIcon className="h-6 w-6 mr-2" />
              Start Recording
            </Button>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Maximum recording time: 2 minutes
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
