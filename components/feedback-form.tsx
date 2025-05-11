"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquareIcon, ThumbsDownIcon, SmileIcon, MehIcon, FrownIcon, CheckCircleIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"suggestion" | "issue" | "compliment">("suggestion")
  const [satisfaction, setSatisfaction] = useState<"satisfied" | "neutral" | "unsatisfied" | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log({
      feedbackType,
      satisfaction,
      ...formData,
    })

    // Show success message
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setIsOpen(false)
      setFeedbackType("suggestion")
      setSatisfaction(null)
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <div className="fixed bottom-24 right-20 z-40">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-4 w-[320px]"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your feedback has been submitted successfully. We appreciate your input!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Share Your Feedback</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                      <ThumbsDownIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Feedback Type</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <Button
                          type="button"
                          variant={feedbackType === "suggestion" ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => setFeedbackType("suggestion")}
                        >
                          Suggestion
                        </Button>
                        <Button
                          type="button"
                          variant={feedbackType === "issue" ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => setFeedbackType("issue")}
                        >
                          Issue
                        </Button>
                        <Button
                          type="button"
                          variant={feedbackType === "compliment" ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => setFeedbackType("compliment")}
                        >
                          Compliment
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">How satisfied are you?</Label>
                      <div className="flex justify-between mt-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={`flex flex-col items-center gap-1 ${satisfaction === "unsatisfied" ? "text-red-500" : "text-gray-500"}`}
                          onClick={() => setSatisfaction("unsatisfied")}
                        >
                          <FrownIcon className="h-6 w-6" />
                          <span className="text-xs">Unsatisfied</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={`flex flex-col items-center gap-1 ${satisfaction === "neutral" ? "text-yellow-500" : "text-gray-500"}`}
                          onClick={() => setSatisfaction("neutral")}
                        >
                          <MehIcon className="h-6 w-6" />
                          <span className="text-xs">Neutral</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={`flex flex-col items-center gap-1 ${satisfaction === "satisfied" ? "text-green-500" : "text-gray-500"}`}
                          onClick={() => setSatisfaction("satisfied")}
                        >
                          <SmileIcon className="h-6 w-6" />
                          <span className="text-xs">Satisfied</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name (optional)
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email (optional)
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Your Feedback
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please share your thoughts..."
                        rows={3}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Submit Feedback
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full shadow-lg ${isOpen ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {isOpen ? <ThumbsDownIcon className="h-5 w-5 mr-2" /> : <MessageSquareIcon className="h-5 w-5 mr-2" />}
          {isOpen ? "Close" : "Feedback"}
        </Button>
      </div>
    </>
  )
}
