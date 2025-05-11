"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import {
  UploadIcon,
  CheckCircleIcon,
  XIcon,
  AlertCircleIcon,
  FileTextIcon,
  FileImageIcon,
  FileIcon as FilePdfIcon,
  FileArchiveIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileWithPreview extends File {
  preview?: string
  id: string
}

export default function DocumentSubmission() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    documentType: "",
    description: "",
  })

  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      documentType: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    // Check file size (limit to 10MB per file)
    const maxSize = 10 * 1024 * 1024 // 10MB

    const newFiles: FileWithPreview[] = Array.from(selectedFiles)
      .filter((file) => {
        if (file.size > maxSize) {
          setError(`File "${file.name}" exceeds the 10MB size limit.`)
          return false
        }
        return true
      })
      .map((file) => {
        // Create preview for images
        let preview = undefined
        if (file.type.startsWith("image/")) {
          preview = URL.createObjectURL(file)
        }

        return {
          ...file,
          preview,
          id: `${file.name}-${Date.now()}`,
        }
      })

    setFiles((prev) => [...prev, ...newFiles])

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== id)

      // Revoke object URLs to avoid memory leaks
      const fileToRemove = prev.find((file) => file.id === id)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }

      return updatedFiles
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      setError("Please attach at least one file.")
      return
    }

    setError(null)
    setUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      setTimeout(() => {
        setUploading(false)
        setSubmitted(true)

        // Clean up file previews
        files.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview)
          }
        })

        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitted(false)
          setFormState({
            name: "",
            email: "",
            phone: "",
            documentType: "",
            description: "",
          })
          setFiles([])
          setUploadProgress(0)
        }, 5000)
      }, 1000)
    }, 3000)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <FileImageIcon className="h-5 w-5 text-blue-600" />
    } else if (file.type === "application/pdf") {
      return <FilePdfIcon className="h-5 w-5 text-red-600" />
    } else if (file.type.includes("zip") || file.type.includes("compressed")) {
      return <FileArchiveIcon className="h-5 w-5 text-yellow-600" />
    } else {
      return <FileTextIcon className="h-5 w-5 text-gray-600" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Document Submission</h2>
        <p className="text-lg">
          Submit documents to the City Schools Division of Cabuyao, Laguna. Please fill out the form and attach the
          required files.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircleIcon className="h-20 w-20 text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Submission Successful!</h3>
                  <p className="text-gray-600 max-w-md mb-6">
                    Your documents have been successfully submitted. You will receive a confirmation email shortly.
                  </p>
                  <p className="text-sm text-gray-500">Reference Number: DOC-{Math.floor(Math.random() * 1000000)}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-blue-900 font-medium">
                        Full Name (required)
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-blue-900 font-medium">
                        Email Address (required)
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="border-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-blue-900 font-medium">
                        Contact Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documentType" className="text-blue-900 font-medium">
                        Document Type (required)
                      </Label>
                      <Select value={formState.documentType} onValueChange={handleSelectChange} required>
                        <SelectTrigger id="documentType" className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="application">School Application</SelectItem>
                          <SelectItem value="enrollment">Enrollment Form</SelectItem>
                          <SelectItem value="transfer">Transfer Request</SelectItem>
                          <SelectItem value="certificate">Certificate Request</SelectItem>
                          <SelectItem value="complaint">Complaint/Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-blue-900 font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formState.description}
                      onChange={handleChange}
                      placeholder="Provide additional details about your submission"
                      rows={4}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-900 font-medium">Attachments (required)</Label>
                    <div
                      className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
                      />
                      <UploadIcon className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                      <p className="text-blue-800 font-medium mb-1">Drag and drop files here or click to browse</p>
                      <p className="text-sm text-gray-500">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG, ZIP (Max 10MB per file)
                      </p>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-3">
                      <Label className="text-blue-900 font-medium">Selected Files ({files.length})</Label>
                      <div className="space-y-2 max-h-60 overflow-y-auto p-2">
                        {files.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200"
                          >
                            <div className="flex items-center space-x-3">
                              {file.preview ? (
                                <img
                                  src={file.preview || "/placeholder.svg"}
                                  alt={file.name}
                                  className="h-10 w-10 object-cover rounded"
                                />
                              ) : (
                                getFileIcon(file)
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Submit Documents"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0 sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Submission Guidelines</h3>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-800 mb-2">Required Documents</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Properly filled out forms</li>
                    <li>• Valid ID or school ID</li>
                    <li>• Supporting documents as needed</li>
                    <li>• Signed authorization letter (if applicable)</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-medium text-yellow-800 mb-2">Processing Time</h4>
                  <p className="text-sm text-gray-600">
                    Document processing typically takes 3-5 working days. You will receive a confirmation email once
                    your submission has been processed.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-medium text-green-800 mb-2">Privacy Notice</h4>
                  <p className="text-sm text-gray-600">
                    All submitted information and documents are kept confidential and will only be used for the purpose
                    stated in your submission.
                  </p>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium text-blue-800 mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have questions about document submission, please contact our support team:
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> documents.cabuyao@deped.gov.ph
                    <br />
                    <strong>Phone:</strong> (049) 531-2465
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
