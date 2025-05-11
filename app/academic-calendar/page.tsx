"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import {
  CalendarIcon,
  DownloadIcon,
  PrinterIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  GraduationCapIcon,
  ClipboardListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

// Define the event type
interface AcademicEvent {
  id: number
  title: string
  date: string
  endDate?: string
  category: "academic" | "exam" | "holiday" | "event" | "teacher"
  semester: "first" | "second" | "summer"
  description: string
}

export default function AcademicCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedSchoolYear, setSelectedSchoolYear] = useState("2025-2026")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedView, setSelectedView] = useState("calendar")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(null)

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [selectedSchoolYear, selectedSemester, selectedView])

  // Sample academic calendar events
  const academicEvents: AcademicEvent[] = [
    {
      id: 1,
      title: "First Day of Classes",
      date: "2025-08-03",
      category: "academic",
      semester: "first",
      description: "Official start of classes for School Year 2025-2026",
    },
    {
      id: 2,
      title: "First Quarter Exams",
      date: "2025-10-05",
      endDate: "2025-10-09",
      category: "exam",
      semester: "first",
      description: "First quarter assessment for all grade levels",
    },
    {
      id: 3,
      title: "Semestral Break",
      date: "2025-10-24",
      endDate: "2025-11-02",
      category: "holiday",
      semester: "first",
      description: "Mid-year break between first and second semesters",
    },
    {
      id: 4,
      title: "Second Semester Starts",
      date: "2025-11-03",
      category: "academic",
      semester: "second",
      description: "Beginning of second semester classes",
    },
    {
      id: 5,
      title: "Christmas Break",
      date: "2025-12-19",
      endDate: "2026-01-05",
      category: "holiday",
      semester: "second",
      description: "Christmas and New Year holiday break",
    },
    {
      id: 6,
      title: "Third Quarter Exams",
      date: "2026-01-19",
      endDate: "2026-01-23",
      category: "exam",
      semester: "second",
      description: "Third quarter assessment for all grade levels",
    },
    {
      id: 7,
      title: "Final Exams",
      date: "2026-03-15",
      endDate: "2026-03-19",
      category: "exam",
      semester: "second",
      description: "Final examinations for the school year",
    },
    {
      id: 8,
      title: "Graduation Ceremonies",
      date: "2026-04-05",
      category: "event",
      semester: "second",
      description: "Graduation and recognition ceremonies for all schools",
    },
    {
      id: 9,
      title: "Summer Break Begins",
      date: "2026-04-10",
      category: "holiday",
      semester: "summer",
      description: "Start of summer vacation",
    },
    {
      id: 10,
      title: "Teacher Planning Days",
      date: "2025-07-28",
      endDate: "2025-08-01",
      category: "teacher",
      semester: "first",
      description: "Preparation days for teachers before the start of classes",
    },
    // Adding more events for better testing
    {
      id: 11,
      title: "National Heroes Day",
      date: "2025-08-31",
      category: "holiday",
      semester: "first",
      description: "National holiday celebrating Filipino heroes",
    },
    {
      id: 12,
      title: "Science Fair",
      date: "2025-09-15",
      endDate: "2025-09-17",
      category: "event",
      semester: "first",
      description: "Annual science fair showcasing student projects",
    },
    {
      id: 13,
      title: "Parent-Teacher Conference",
      date: "2025-09-25",
      category: "event",
      semester: "first",
      description: "Meeting between parents and teachers to discuss student progress",
    },
    {
      id: 14,
      title: "Rizal Day",
      date: "2025-12-30",
      category: "holiday",
      semester: "second",
      description: "Commemoration of the life and works of Dr. Jose Rizal",
    },
    {
      id: 15,
      title: "Foundation Day",
      date: "2026-02-10",
      category: "event",
      semester: "second",
      description: "Celebration of the school's founding anniversary",
    },
  ]

  // Filter events based on selected semester and school year
  const filteredEvents = academicEvents
    .filter((event) => selectedSemester === "all" || event.semester === selectedSemester)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Group events by month for the list view
  const groupedEvents = filteredEvents.reduce(
    (groups, event) => {
      const date = new Date(event.date)
      const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" })

      if (!groups[monthYear]) {
        groups[monthYear] = []
      }

      groups[monthYear].push(event)
      return groups
    },
    {} as Record<string, AcademicEvent[]>,
  )

  // Function to get events for a specific date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return []

    return filteredEvents.filter((event) => {
      const eventStartDate = new Date(event.date)
      const eventEndDate = event.endDate ? new Date(event.endDate) : null

      // Check if the date is the start date
      if (
        eventStartDate.getDate() === date.getDate() &&
        eventStartDate.getMonth() === date.getMonth() &&
        eventStartDate.getFullYear() === date.getFullYear()
      ) {
        return true
      }

      // Check if the date is between start and end dates
      if (eventEndDate) {
        const checkDate = new Date(date)
        return checkDate >= eventStartDate && checkDate <= eventEndDate
      }

      return false
    })
  }

  // Function to handle date selection in the calendar
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)

    // If there's only one event on this date, select it automatically
    const events = newDate ? getEventsForDate(newDate) : []
    if (events.length === 1) {
      setSelectedEvent(events[0])
    } else {
      setSelectedEvent(null)
    }
  }

  // Function to get CSS class for calendar day based on events
  const getDayClass = (day: Date) => {
    const events = getEventsForDate(day)
    if (events.length === 0) return ""

    // Return class based on the category of the first event
    const firstEvent = events[0]
    switch (firstEvent.category) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "holiday":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      case "teacher":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return ""
    }
  }

  // Function to get badge class based on event category
  const getBadgeClass = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "holiday":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      case "teacher":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return ""
    }
  }

  // Function to download calendar as PDF
  const downloadCalendar = () => {
    alert("Calendar download functionality will be implemented here")
    // In a real implementation, this would generate a PDF of the calendar
  }

  // Function to print calendar
  const printCalendar = () => {
    window.print()
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg shadow-lg mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Academic Calendar</h1>
          <p className="text-green-100">View important dates, events, and schedules for the academic year</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle>Filters</CardTitle>
                <CardDescription>Customize your calendar view</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">School Year</label>
                  <Select value={selectedSchoolYear} onValueChange={setSelectedSchoolYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select school year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Semester</label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      <SelectItem value="first">First Semester</SelectItem>
                      <SelectItem value="second">Second Semester</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">View</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedView === "calendar" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedView("calendar")}
                      className="justify-start"
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Calendar
                    </Button>
                    <Button
                      variant={selectedView === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedView("list")}
                      className="justify-start"
                    >
                      <ClipboardListIcon className="h-4 w-4 mr-2" />
                      List
                    </Button>
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <label className="text-sm font-medium">Legend</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-sm">Academic</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      <span className="text-sm">Exams</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm">Events</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                      <span className="text-sm">Holidays</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                      <span className="text-sm">Teacher Days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full" variant="outline" onClick={downloadCalendar}>
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {isLoading ? (
              <Card>
                <CardHeader className="pb-2">
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-[300px] w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Academic Calendar {selectedSchoolYear}</CardTitle>
                    <CardDescription>
                      {selectedSemester === "all"
                        ? "All semesters"
                        : selectedSemester === "first"
                          ? "First semester"
                          : selectedSemester === "second"
                            ? "Second semester"
                            : "Summer term"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={printCalendar}>
                      <PrinterIcon className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadCalendar}>
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedView === "calendar" ? (
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="mb-4 flex justify-between items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newDate = new Date(date || new Date())
                            newDate.setMonth(newDate.getMonth() - 1)
                            setDate(newDate)
                          }}
                        >
                          <ChevronLeftIcon className="h-4 w-4 mr-1" />
                          Previous
                        </Button>
                        <h3 className="font-medium">
                          {date?.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newDate = new Date(date || new Date())
                            newDate.setMonth(newDate.getMonth() + 1)
                            setDate(newDate)
                          }}
                        >
                          Next
                          <ChevronRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                      </div>

                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                        modifiers={{
                          hasEvent: (day) => getEventsForDate(day).length > 0,
                        }}
                        modifiersClassNames={{
                          hasEvent: "font-bold text-primary",
                        }}
                        components={{
                          DayContent: ({ day }) => {
                            const events = getEventsForDate(day)
                            return (
                              <div className="relative w-full h-full flex items-center justify-center">
                                {day.day}
                                {events.length > 0 && (
                                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                                  </div>
                                )}
                              </div>
                            )
                          },
                        }}
                      />

                      <div className="mt-6">
                        <h3 className="font-medium text-lg mb-3">
                          Events on{" "}
                          {date?.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </h3>

                        {date && getEventsForDate(date).length > 0 ? (
                          <div className="space-y-3">
                            {getEventsForDate(date).map((event) => (
                              <div
                                key={event.id}
                                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                onClick={() => setSelectedEvent(event === selectedEvent ? null : event)}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{event.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                                  </div>
                                  <Badge className={getBadgeClass(event.category)}>
                                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                  </Badge>
                                </div>
                                {event.endDate && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Until{" "}
                                    {new Date(event.endDate).toLocaleDateString("en-US", {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                )}

                                <AnimatePresence>
                                  {selectedEvent?.id === event.id && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="mt-3 pt-3 border-t overflow-hidden"
                                    >
                                      <div className="flex gap-2 mt-2">
                                        <Button size="sm" variant="outline">
                                          Add to My Calendar
                                        </Button>
                                        <Button size="sm" variant="outline">
                                          Set Reminder
                                        </Button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <CalendarDaysIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                            <p>No events scheduled for this date</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(groupedEvents).length > 0 ? (
                        Object.entries(groupedEvents).map(([monthYear, events]) => (
                          <div key={monthYear}>
                            <h3 className="font-medium text-lg mb-3 border-b pb-2">{monthYear}</h3>
                            <div className="space-y-3">
                              {events.map((event) => (
                                <div
                                  key={event.id}
                                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                  onClick={() => setSelectedEvent(event === selectedEvent ? null : event)}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                      <div className="text-center min-w-[50px]">
                                        <div className="text-xl font-bold">{new Date(event.date).getDate()}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                          {new Date(event.date).toLocaleDateString("en-US", { weekday: "short" })}
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{event.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                                        {event.endDate && (
                                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            Until{" "}
                                            {new Date(event.endDate).toLocaleDateString("en-US", {
                                              month: "long",
                                              day: "numeric",
                                            })}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <Badge className={getBadgeClass(event.category)}>
                                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                    </Badge>
                                  </div>

                                  <AnimatePresence>
                                    {selectedEvent?.id === event.id && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="mt-3 pt-3 border-t overflow-hidden"
                                      >
                                        <div className="flex gap-2 mt-2">
                                          <Button size="sm" variant="outline">
                                            Add to My Calendar
                                          </Button>
                                          <Button size="sm" variant="outline">
                                            Set Reminder
                                          </Button>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <CalendarDaysIcon className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                          <h3 className="text-xl font-semibold mb-2">No events found</h3>
                          <p className="text-muted-foreground">There are no events matching your current filters.</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpenIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Academic Periods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">First Semester</TableCell>
                        <TableCell>Aug 3 - Oct 23, 2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Second Semester</TableCell>
                        <TableCell>Nov 3, 2025 - Apr 9, 2026</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Summer Term</TableCell>
                        <TableCell>Apr 20 - May 29, 2026</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <GraduationCapIcon className="h-5 w-5 mr-2 text-green-600" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Enrollment</TableCell>
                        <TableCell>Jul 1 - Jul 31, 2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Graduation</TableCell>
                        <TableCell>Apr 5, 2026</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Recognition Day</TableCell>
                        <TableCell>Apr 3, 2026</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 mr-2 text-amber-600" />
                    Holidays & Breaks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Semestral Break</TableCell>
                        <TableCell>Oct 24 - Nov 2, 2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Christmas Break</TableCell>
                        <TableCell>Dec 19, 2025 - Jan 5, 2026</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Summer Break</TableCell>
                        <TableCell>Apr 10 - Jul 31, 2026</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
