"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailIcon, CheckCircleIcon } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // In a real app, you would send this to your backend
      console.log("Subscribing email:", email)
      setSubscribed(true)
      setEmail("")

      // Reset the subscribed state after 5 seconds
      setTimeout(() => {
        setSubscribed(false)
      }, 5000)
    }
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
      <p className="text-muted-foreground mb-4">
        Stay updated with the latest news and events from DepEd Cabuyao, Laguna
      </p>

      {subscribed ? (
        <div className="flex items-center justify-center text-green-600 dark:text-green-400">
          <CheckCircleIcon className="mr-2 h-5 w-5" />
          <span>Thank you for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button type="submit">Subscribe</Button>
        </form>
      )}
    </div>
  )
}
