"use client"

import { useState, useEffect } from "react"
import type { Event } from "@/lib/types"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  InfoIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

interface EventCalendarProps {
  events: Event[]
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [currentMonth, currentYear])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    try {
      return new Date(dateString).toLocaleDateString(undefined, options)
    } catch (error) {
      console.error("Invalid date format:", dateString)
      return "Invalid date"
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
    setSelectedEvent(null)
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
    setSelectedEvent(null)
  }

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date().getMonth())
    setCurrentYear(new Date().getFullYear())
    setSelectedEvent(null)
  }

  // Filter events for the current month and year
  const filteredEvents = events.filter((event) => {
    try {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
    } catch (error) {
      console.error("Invalid date in event:", event)
      return false
    }
  })

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    try {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } catch (error) {
      console.error("Error sorting events:", error)
      return 0
    }
  })

  // Get upcoming events (future events, sorted by date)
  const upcomingEvents = events
    .filter((event) => {
      try {
        return new Date(event.date) > new Date()
      } catch (error) {
        console.error("Invalid date in upcoming event filter:", event)
        return false
      }
    })
    .sort((a, b) => {
      try {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } catch (error) {
        console.error("Error sorting upcoming events:", error)
        return 0
      }
    })
    .slice(0, 3)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event === selectedEvent ? null : event)
  }

  const getMonthDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const days = getMonthDays()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getEventsForDay = (day: number | null) => {
    if (day === null) return []

    return sortedEvents.filter((event) => {
      try {
        const eventDate = new Date(event.date)
        return eventDate.getDate() === day
      } catch (error) {
        return false
      }
    })
  }

  const isToday = (day: number | null) => {
    if (day === null) return false

    const today = new Date()
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold flex items-center">
          <CalendarDaysIcon className="mr-2 h-6 w-6 text-primary" />
          Events Calendar
        </h2>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={prevMonth}>
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Previous Month</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Month</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="outline" size="sm" className="min-w-[140px] font-medium" onClick={goToCurrentMonth}>
            {months[currentMonth]} {currentYear}
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ChevronRightIcon className="h-4 w-4" />
                  <span className="sr-only">Next Month</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Month</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Calendar Grid View */}
      <div className="bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 bg-muted">
          {weekdays.map((day, index) => (
            <div key={index} className="p-2 text-center text-sm font-medium border-b">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-muted">
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day)
            const hasEvents = dayEvents.length > 0

            return (
              <div
                key={index}
                className={`min-h-[80px] p-1 bg-card relative ${day === null ? "bg-muted/50" : ""} ${
                  isToday(day) ? "ring-2 ring-primary ring-inset" : ""
                }`}
              >
                {day !== null && (
                  <>
                    <div className="text-right text-sm p-1">{day}</div>

                    {hasEvents && (
                      <div className="absolute bottom-1 left-1 right-1">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className="text-xs truncate mb-1 p-1 rounded bg-primary/10 cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => handleEventClick(event)}
                          >
                            {event.title}
                          </div>
                        ))}

                        {dayEvents.length > 2 && (
                          <div className="text-xs text-center text-muted-foreground">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Event Details */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-card border rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)} className="h-8 w-8 p-0">
                ×
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {formatDate(selectedEvent.date)}
              </div>
              <div className="flex items-center text-sm">
                <ClockIcon className="mr-2 h-4 w-4 text-primary" />
                {selectedEvent.time}
              </div>
              <div className="flex items-center text-sm">
                <MapPinIcon className="mr-2 h-4 w-4 text-primary" />
                {selectedEvent.location}
              </div>
              <p className="pt-2">{selectedEvent.description}</p>
              <div className="pt-2 flex gap-2">
                <Button variant="default" size="sm">
                  Add to Calendar
                </Button>
                <Button variant="outline" size="sm">
                  Share Event
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List View for Current Month Events */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : sortedEvents.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg shadow-sm">
          <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No events this month</h3>
          <p className="text-muted-foreground">
            There are no scheduled events for {months[currentMonth]} {currentYear}.
          </p>
          <Button variant="outline" className="mt-4" onClick={goToCurrentMonth}>
            Go to Current Month
          </Button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {sortedEvents.map((event) => (
            <motion.div key={event.id} variants={item}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <CardHeader className="pb-2 bg-muted/30">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <Badge variant="outline" className="bg-primary/10">
                      {new Date(event.date).getDate()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <ClockIcon className="mr-2 h-4 w-4 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPinIcon className="mr-2 h-4 w-4 text-primary" />
                      {event.location}
                    </div>
                    <p className="pt-2">{event.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <Button variant="outline" size="sm">
                    Add to Calendar
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEventClick(event)}>
                    <InfoIcon className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Upcoming Events Section */}
      <div className="bg-muted p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
          Upcoming Events
        </h3>
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No upcoming events scheduled.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-card transition-colors cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="bg-primary/10 text-primary font-bold p-2 rounded-md text-center min-w-[60px]">
                  <div className="text-2xl">{new Date(event.date).getDate()}</div>
                  <div className="text-xs">{months[new Date(event.date).getMonth()].substring(0, 3)}</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <ClockIcon className="mr-1 h-3 w-3" />
                    {event.time}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center">
                    <MapPinIcon className="mr-1 h-3 w-3" />
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
