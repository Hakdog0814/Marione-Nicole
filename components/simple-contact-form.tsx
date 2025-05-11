"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, Check, Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SimpleContactForm() {
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
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setFormSubmitted(true)

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      {/* Contact Form */}
      <div>
        <Card className="shadow-md">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-xl text-blue-800 dark:text-blue-400">Send us your email</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-600 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                <p className="text-gray-600 max-w-md mx-auto">
                  Your message has been sent successfully. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-900 font-medium">
                    Your Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`border-blue-200 focus:border-blue-500 ${formErrors.name ? "border-red-500" : ""}`}
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
                  <Label htmlFor="email" className="text-blue-900 font-medium">
                    Your Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`border-blue-200 focus:border-blue-500 ${formErrors.email ? "border-red-500" : ""}`}
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
                  <Label htmlFor="phone" className="text-blue-900 font-medium">
                    Telephone/Mobile Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    className={`border-blue-200 focus:border-blue-500 ${formErrors.phone ? "border-red-500" : ""}`}
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
                  <Label htmlFor="subject" className="text-blue-900 font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-blue-900 font-medium">
                    Your Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className={`border-blue-200 focus:border-blue-500 ${formErrors.message ? "border-red-500" : ""}`}
                    aria-invalid={!!formErrors.message}
                  />
                  {formErrors.message && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white mt-4"
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
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-xl text-blue-800 dark:text-blue-400">Our Office</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800 mb-1">Address:</p>
                  <p className="text-gray-700">
                    Cabuyao Enterprise Park, Cabuyao Athletes Basic School (CABS) Brgy. Banay-Banay, City of Cabuyao,
                    Laguna
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800 mb-1">Email:</p>
                  <a href="mailto:division.cabuyao@deped.gov.ph" className="text-blue-600 hover:underline">
                    division.cabuyao@deped.gov.ph
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800 mb-1">TRUNK LINE NO:</p>
                  <p className="text-gray-700">0939 934 0448</p>
                  <p className="text-gray-700">0939 934 0450</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-blue-800 mb-3">OFFICE</h3>
              <ul className="space-y-2 text-gray-700">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
