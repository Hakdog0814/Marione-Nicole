"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { MailIcon, CheckCircleIcon, BellIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Category {
  id: string
  name: string
}

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [showForm, setShowForm] = useState(true)

  const categories: Category[] = [
    { id: "announcements", name: "Announcements" },
    { id: "events", name: "Events & Activities" },
    { id: "curriculum", name: "Curriculum Updates" },
    { id: "policies", name: "Policies & Memoranda" },
    { id: "achievements", name: "School Achievements" },
    { id: "community", name: "Community Programs" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email) {
      // In a real app, you would send this to your backend
      console.log("Subscribing:", {
        email,
        name,
        categories: selectedCategories,
        frequency,
      })

      setSubscribed(true)
      setShowForm(false)

      // Reset form after 5 seconds
      setTimeout(() => {
        setEmail("")
        setName("")
        setSelectedCategories([])
        setFrequency("weekly")
        setSubscribed(false)
        setShowForm(true)
      }, 5000)
    }
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Newsletter Subscription</h2>
        <p className="text-lg">
          Stay updated with the latest news, events, and announcements from DepEd Cabuyao, Laguna.
        </p>
      </motion.div>

      <Card className="shadow-lg border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
              <div className="flex items-center mb-6">
                <BellIcon className="h-8 w-8 mr-3" />
                <h3 className="text-2xl font-bold">Why Subscribe?</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-200" />
                  <span>Get timely updates on important announcements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-200" />
                  <span>Stay informed about upcoming events and activities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-200" />
                  <span>Receive curriculum updates and educational resources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-200" />
                  <span>Learn about student achievements and success stories</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-200" />
                  <span>Customize your subscription to topics you care about</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-blue-500">
                <p className="text-blue-100 text-sm">
                  Your privacy is important to us. We will never share your email address with third parties. You can
                  unsubscribe at any time.
                </p>
              </div>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center py-8"
                  >
                    <div className="bg-green-100 text-green-600 rounded-full p-4 mb-6">
                      <CheckCircleIcon className="h-16 w-16" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Successfully Subscribed!</h3>
                    <p className="text-gray-600 max-w-md mb-4">
                      Thank you for subscribing to our newsletter. You will now receive updates based on your
                      preferences.
                    </p>
                    <p className="text-sm text-gray-500">
                      A confirmation email has been sent to <strong>{email}</strong>
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-blue-800 mb-4">Subscribe to Our Newsletter</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-blue-900 font-medium">
                          Email Address (required)
                        </Label>
                        <div className="relative">
                          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 border-blue-200 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-blue-900 font-medium">
                          Full Name (optional)
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-blue-900 font-medium">Select Topics of Interest</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={category.id}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => toggleCategory(category.id)}
                            />
                            <label
                              htmlFor={category.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-blue-900 font-medium">Email Frequency</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant={frequency === "daily" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFrequency("daily")}
                          className={frequency === "daily" ? "bg-blue-600" : "border-blue-200 text-blue-700"}
                        >
                          Daily
                        </Button>
                        <Button
                          type="button"
                          variant={frequency === "weekly" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFrequency("weekly")}
                          className={frequency === "weekly" ? "bg-blue-600" : "border-blue-200 text-blue-700"}
                        >
                          Weekly
                        </Button>
                        <Button
                          type="button"
                          variant={frequency === "monthly" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFrequency("monthly")}
                          className={frequency === "monthly" ? "bg-blue-600" : "border-blue-200 text-blue-700"}
                        >
                          Monthly
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                    >
                      Subscribe Now
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By subscribing, you agree to receive emails from DepEd Cabuyao. You can unsubscribe at any time.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
