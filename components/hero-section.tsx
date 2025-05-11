"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRightIcon, CalendarIcon, FileTextIcon, SearchIcon, UsersIcon, ArrowRightIcon } from "lucide-react"
import Image from "next/image"

interface HeroProps {
  onSearch: () => void
}

export default function HeroSection({ onSearch }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Welcome to DepEd Cabuyao",
      subtitle: "City Schools Division of Cabuyao, Laguna",
      description: "Providing quality education to all learners in Cabuyao, Laguna.",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Learn More",
      ctaAction: () => (window.location.href = "#about"),
    },
    {
      title: "Upcoming Events",
      subtitle: "Stay Updated with School Activities",
      description: "Join our community events, workshops, and educational programs.",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "View Calendar",
      ctaAction: () => (window.location.href = "#events"),
    },
    {
      title: "Resources for Teachers",
      subtitle: "Access Teaching Materials",
      description: "Download lesson plans, modules, and educational resources.",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Browse Resources",
      ctaAction: () => (window.location.href = "/resources"),
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="relative h-[500px] overflow-hidden rounded-xl shadow-xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/70 z-10"></div>
      <Image
        src={slides[currentSlide].image || "/placeholder.svg"}
        alt="DepEd Cabuyao"
        fill
        className="object-cover transition-opacity duration-1000"
        priority
      />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-black/20 backdrop-blur-sm p-8 rounded-xl dark:bg-black/40"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{slides[currentSlide].title}</h1>
          <h2 className="text-xl md:text-2xl font-medium text-blue-100 mb-4">{slides[currentSlide].subtitle}</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl">{slides[currentSlide].description}</p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-800 hover:bg-blue-50 dark:bg-blue-100 dark:hover:bg-blue-200 shadow-lg"
              onClick={slides[currentSlide].ctaAction}
            >
              {slides[currentSlide].cta}
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/20 shadow-lg"
              onClick={onSearch}
            >
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Quick Links */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-blue-900/90 dark:from-blue-950/90 to-transparent">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/10 dark:hover:bg-white/5 justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Events</span>
              <ArrowRightIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 dark:hover:bg-white/5 justify-start">
              <FileTextIcon className="mr-2 h-4 w-4" />
              <span>News</span>
              <ArrowRightIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 dark:hover:bg-white/5 justify-start">
              <UsersIcon className="mr-2 h-4 w-4" />
              <span>Schools</span>
              <ArrowRightIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10 dark:hover:bg-white/5 justify-start">
              <SearchIcon className="mr-2 h-4 w-4" />
              <span>Directory</span>
              <ArrowRightIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
