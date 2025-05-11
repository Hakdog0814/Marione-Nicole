"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, AlertCircle, Check } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState<{
    name?: string
    email?: string
    phone?: string
    message?: string
  }>({})

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      })
    }
  }

  const validateForm = (): boolean => {
    const errors: {
      name?: string
      email?: string
      phone?: string
      message?: string
    } = {}

    if (!formState.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formState.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!/^[0-9+\s()-]{10,15}$/.test(formState.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid phone number"
    }

    if (!formState.message.trim()) {
      errors.message = "Message is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]')
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setFormSubmitted(true)

        // Generate a reference ID
        const referenceId = `MSG-${Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")}`

        // Store in localStorage for future reference
        try {
          const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")
          submissions.push({
            id: referenceId,
            name: formState.name,
            email: formState.email,
            date: new Date().toISOString(),
            subject: formState.subject || "General Inquiry",
          })
          localStorage.setItem("contactSubmissions", JSON.stringify(submissions))
        } catch (storageError) {
          console.error("Error storing submission in localStorage:", storageError)
        }

        // Reset form after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false)
          setFormState({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          })
          if (formRef.current) {
            formRef.current.reset()
          }
        }, 5000)
      }, 1500)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
      setFormErrors({
        ...formErrors,
        message: "An error occurred while submitting the form. Please try again.",
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg">
          Get in touch with the City Schools Division of Cabuyao, Laguna. We're here to help with any inquiries or
          concerns.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form Section - Takes 2/3 of the space */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-b">
              <CardTitle className="text-xl text-blue-800 dark:text-blue-400">Send us a message</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {formSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="text-2xl font-semibold mb-2 dark:text-gray-200">Thank You!</h4>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg inline-block">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Reference ID: MSG-
                      {Math.floor(Math.random() * 1000000)
                        .toString()
                        .padStart(6, "0")}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-900 font-medium dark:text-blue-300">
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`border-blue-200 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                        formErrors.name ? "border-red-500 dark:border-red-500" : ""
                      }`}
                      aria-invalid={!!formErrors.name}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-900 font-medium dark:text-blue-300">
                      Your Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`border-blue-200 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                        formErrors.email ? "border-red-500 dark:border-red-500" : ""
                      }`}
                      aria-invalid={!!formErrors.email}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-blue-900 font-medium dark:text-blue-300">
                      Telephone/Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      className={`border-blue-200 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                        formErrors.phone ? "border-red-500 dark:border-red-500" : ""
                      }`}
                      aria-invalid={!!formErrors.phone}
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-blue-900 font-medium dark:text-blue-300">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="border-blue-200 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-blue-900 font-medium dark:text-blue-300">
                      Your Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className={`border-blue-200 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                        formErrors.message ? "border-red-500 dark:border-red-500" : ""
                      }`}
                      aria-invalid={!!formErrors.message}
                    />
                    {formErrors.message && (
                      <p className="text-sm text-red-500 mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Fields marked with <span className="text-red-500">*</span> are required
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Information Sidebar - Takes 1/3 of the space */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-b">
              <CardTitle className="text-xl text-blue-800 dark:text-blue-400">Our Office</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">Address:</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Cabuyao Enterprise Park, Cabuyao Athletes Basic School (CABS), Brgy. Banay-Banay, City of Cabuyao,
                      Laguna
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">Email:</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">division.cabuyao@deped.gov.ph</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">TRUNK LINE NO:</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      0939 934 0448
                      <br />
                      0939 934 0450
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 border-b">
              <CardTitle className="text-xl text-blue-800 dark:text-blue-400">OFFICE</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li>SDS Office – Local 101</li>
                <li>ASDS Office – Local 102</li>
                <li>CID Office –Local 103</li>
                <li>SGOD Office – Local 104</li>
                <li>Health Section – Local 105</li>
                <li>Administrative Services – Local 106</li>
                <li>Personnel Unit – Local 107</li>
                <li>Records Unit – Local 108</li>
                <li>Legal Unit – Local 109</li>
                <li>Cash and Budget Unit – Local 110</li>
                <li>Accounting Unit – 111</li>
                <li>Supply and Property Unit – 112</li>
                <li>ICT Unit – 114</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
