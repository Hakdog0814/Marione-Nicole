"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  ArrowUpIcon,
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  ClipboardListIcon,
  PlusIcon,
  SchoolIcon,
  SearchIcon,
  UserIcon,
  UsersIcon,
  XIcon,
  InfoIcon,
  BellRingIcon,
} from "lucide-react"
import { motion } from "framer-motion"
import { format } from "date-fns"

// Sample data for charts
const attendanceData = [
  { month: "Jan", attendance: 95, target: 97 },
  { month: "Feb", attendance: 97, target: 97 },
  { month: "Mar", attendance: 94, target: 97 },
  { month: "Apr", attendance: 96, target: 97 },
  { month: "May", attendance: 93, target: 97 },
  { month: "Jun", attendance: 95, target: 97 },
  { month: "Jul", attendance: 98, target: 97 },
  { month: "Aug", attendance: 97, target: 97 },
  { month: "Sep", attendance: 96, target: 97 },
  { month: "Oct", attendance: 94, target: 97 },
  { month: "Nov", attendance: 95, target: 97 },
  { month: "Dec", attendance: 93, target: 97 },
]

const enrollmentData = [
  { year: "2020", elementary: 12500, highSchool: 8200, seniorHigh: 4100 },
  { year: "2021", elementary: 12800, highSchool: 8500, seniorHigh: 4300 },
  { year: "2022", elementary: 13100, highSchool: 8700, seniorHigh: 4500 },
  { year: "2023", elementary: 13400, highSchool: 9000, seniorHigh: 4800 },
  { year: "2024", elementary: 13800, highSchool: 9300, seniorHigh: 5100 },
  { year: "2025", elementary: 14200, highSchool: 9600, seniorHigh: 5400 },
]

const performanceData = [
  { subject: "Math", score: 82, previousScore: 78, target: 85 },
  { subject: "Science", score: 78, previousScore: 75, target: 85 },
  { subject: "English", score: 85, previousScore: 82, target: 85 },
  { subject: "Filipino", score: 88, previousScore: 85, target: 85 },
  { subject: "Social Studies", score: 80, previousScore: 77, target: 85 },
  { subject: "PE & Health", score: 92, previousScore: 90, target: 85 },
]

const genderDistributionData = [
  { name: "Male", value: 12450 },
  { name: "Female", value: 12400 },
]

const monthlyProgressData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 72 },
  { name: "Mar", value: 78 },
  { name: "Apr", value: 82 },
  { name: "May", value: 85 },
  { name: "Jun", value: 89 },
  { name: "Jul", value: 91 },
  { name: "Aug", value: 93 },
  { name: "Sep", value: 94 },
  { name: "Oct", value: 96 },
  { name: "Nov", value: 97 },
  { name: "Dec", value: 98 },
]

const schoolTypeData = [
  { name: "Elementary", value: 24 },
  { name: "Junior High", value: 12 },
  { name: "Senior High", value: 6 },
]

const teacherQualificationData = [
  { name: "Bachelor's Degree", value: 620 },
  { name: "Master's Degree", value: 450 },
  { name: "PhD", value: 175 },
]

const studentPerformanceRadarData = [
  { subject: "Math", score: 82, fullMark: 100 },
  { subject: "Science", score: 78, fullMark: 100 },
  { subject: "English", score: 85, fullMark: 100 },
  { subject: "Filipino", score: 88, fullMark: 100 },
  { subject: "Social Studies", score: 80, fullMark: 100 },
  { subject: "PE & Health", score: 92, fullMark: 100 },
]

const budgetAllocationData = [
  { name: "Salaries", value: 65 },
  { name: "Facilities", value: 15 },
  { name: "Learning Materials", value: 10 },
  { name: "Technology", value: 5 },
  { name: "Others", value: 5 },
]

const yearlyComparisonData = [
  { year: "2020", enrollment: 24800, graduation: 5600, dropout: 320 },
  { year: "2021", enrollment: 25600, graduation: 5800, dropout: 310 },
  { year: "2022", enrollment: 26300, graduation: 6100, dropout: 290 },
  { year: "2023", enrollment: 27200, graduation: 6300, dropout: 270 },
  { year: "2024", enrollment: 28100, graduation: 6500, dropout: 250 },
  { year: "2025", enrollment: 29200, graduation: 6800, dropout: 230 },
]

const COLORS = ["#16a34a", "#4ade80", "#86efac", "#bbf7d0"]
const GENDER_COLORS = ["#16a34a", "#d946ef"]
const SCHOOL_TYPE_COLORS = ["#16a34a", "#0ea5e9", "#f59e0b"]
const TEACHER_QUALIFICATION_COLORS = ["#16a34a", "#0ea5e9", "#8b5cf6"]
const BUDGET_COLORS = ["#16a34a", "#0ea5e9", "#f59e0b", "#8b5cf6", "#64748b"]

// Sample tasks data
const tasks = [
  {
    id: 1,
    title: "Review curriculum updates",
    status: "completed",
    dueDate: "2025-03-20",
    priority: "medium",
    assignee: "Maria Santos",
    department: "Curriculum",
  },
  {
    id: 2,
    title: "Submit quarterly report",
    status: "in-progress",
    dueDate: "2025-03-28",
    priority: "high",
    assignee: "Carlos Mendoza",
    department: "Administration",
  },
  {
    id: 3,
    title: "Prepare for teacher evaluation",
    status: "pending",
    dueDate: "2025-04-05",
    priority: "high",
    assignee: "Elena Cruz",
    department: "HR",
  },
  {
    id: 4,
    title: "Update student records",
    status: "in-progress",
    dueDate: "2025-03-25",
    priority: "medium",
    assignee: "Juan Reyes",
    department: "Records",
  },
  {
    id: 5,
    title: "Organize parent-teacher meeting",
    status: "pending",
    dueDate: "2025-04-10",
    priority: "medium",
    assignee: "Sofia Garcia",
    department: "Community Relations",
  },
  {
    id: 6,
    title: "Review budget allocation",
    status: "pending",
    dueDate: "2025-04-15",
    priority: "high",
    assignee: "Roberto Tan",
    department: "Finance",
  },
]

// Sample announcements data
const announcements = [
  {
    id: 1,
    title: "School Calendar for 2025-2026 Released",
    content:
      "The official school calendar for the academic year 2025-2026 has been released. Please review the important dates and deadlines for the upcoming school year. All school heads are required to disseminate this information to their respective faculty and staff.",
    date: "2025-03-15",
    author: "Dr. Maria Santos",
    authorRole: "Schools Division Superintendent",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    important: true,
    attachments: [{ name: "School_Calendar_2025-2026.pdf", size: "1.2 MB" }],
  },
  {
    id: 2,
    title: "Teacher Training Workshop",
    content:
      "A professional development workshop for all teachers will be held on April 5-6, 2025. Attendance is mandatory. The workshop will focus on innovative teaching methodologies and the integration of technology in the classroom.",
    date: "2025-03-10",
    author: "Prof. Carlos Mendoza",
    authorRole: "Education Program Supervisor",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    important: false,
    attachments: [
      { name: "Workshop_Schedule.pdf", size: "850 KB" },
      { name: "Registration_Form.docx", size: "320 KB" },
    ],
  },
  {
    id: 3,
    title: "New Curriculum Implementation",
    content:
      "The new K-12 curriculum will be implemented starting next academic year. Training sessions will be scheduled soon. The curriculum updates focus on enhancing critical thinking skills and digital literacy across all subject areas.",
    date: "2025-03-05",
    author: "Dr. Elena Cruz",
    authorRole: "Curriculum Development Head",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    important: true,
    attachments: [{ name: "New_Curriculum_Overview.pdf", size: "2.4 MB" }],
  },
  {
    id: 4,
    title: "Budget Allocation for School Facilities",
    content:
      "The budget for school facilities improvement has been approved. School heads should submit their proposals by April 30. Priority will be given to projects focusing on classroom renovation, technology infrastructure, and accessibility improvements.",
    date: "2025-03-02",
    author: "Mr. Roberto Tan",
    authorRole: "Finance Officer",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    important: false,
    attachments: [
      { name: "Budget_Guidelines.pdf", size: "1.5 MB" },
      { name: "Proposal_Template.docx", size: "450 KB" },
    ],
  },
]

// Sample upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Division Science Fair",
    date: "2025-04-15",
    time: "8:00 AM - 5:00 PM",
    location: "Cabuyao Central School",
    description: "Annual science fair showcasing student projects from all schools in the division.",
    organizer: "Science Education Department",
    attendees: 1200,
    status: "confirmed",
  },
  {
    id: 2,
    title: "Teachers' Day Celebration",
    date: "2025-04-22",
    time: "9:00 AM - 3:00 PM",
    location: "Cabuyao City Hall Auditorium",
    description: "Annual celebration honoring teachers' contributions to education and society.",
    organizer: "DepEd Cabuyao",
    attendees: 850,
    status: "confirmed",
  },
  {
    id: 3,
    title: "Division Athletic Meet",
    date: "2025-05-10",
    time: "7:00 AM - 6:00 PM",
    location: "Cabuyao Sports Complex",
    description: "Annual sports competition featuring athletes from all schools in the division.",
    organizer: "Physical Education Department",
    attendees: 2000,
    status: "planning",
  },
  {
    id: 4,
    title: "School Heads Meeting",
    date: "2025-04-05",
    time: "1:00 PM - 4:00 PM",
    location: "DepEd Division Office",
    description: "Quarterly meeting of all school principals and heads to discuss division policies.",
    organizer: "Office of the Schools Division Superintendent",
    attendees: 45,
    status: "confirmed",
  },
]

// Sample schools data
const topPerformingSchools = [
  {
    id: 1,
    name: "Cabuyao Central School",
    type: "Elementary",
    performance: 96.8,
    enrollment: 1245,
    location: "Poblacion, Cabuyao",
    principal: "Dr. Maria Reyes",
    ranking: 1,
    previousRanking: 2,
    trend: "up",
  },
  {
    id: 2,
    name: "Pulo National High School",
    type: "Secondary",
    performance: 95.2,
    enrollment: 987,
    location: "Pulo, Cabuyao",
    principal: "Mr. Jose Santos",
    ranking: 2,
    previousRanking: 1,
    trend: "down",
  },
  {
    id: 3,
    name: "Banay-Banay Elementary School",
    type: "Elementary",
    performance: 94.7,
    enrollment: 876,
    location: "Banay-Banay, Cabuyao",
    principal: "Mrs. Elena Cruz",
    ranking: 3,
    previousRanking: 4,
    trend: "up",
  },
  {
    id: 4,
    name: "Cabuyao National High School",
    type: "Secondary",
    performance: 94.1,
    enrollment: 1532,
    location: "Mamatid, Cabuyao",
    principal: "Dr. Roberto Tan",
    ranking: 4,
    previousRanking: 3,
    trend: "down",
  },
  {
    id: 5,
    name: "Marinig Elementary School",
    type: "Elementary",
    performance: 93.8,
    enrollment: 765,
    location: "Marinig, Cabuyao",
    principal: "Ms. Sofia Reyes",
    ranking: 5,
    previousRanking: 5,
    trend: "same",
  },
]

// Sample programs data
const educationalPrograms = [
  {
    id: 1,
    name: "Reading Literacy Program",
    participants: 12500,
    progress: 78,
    status: "active",
    coordinator: "Dr. Ana Santos",
    budget: 1500000,
    startDate: "2024-06-15",
    endDate: "2025-05-30",
    schools: 35,
  },
  {
    id: 2,
    name: "STEM Education Enhancement",
    participants: 8700,
    progress: 65,
    status: "active",
    coordinator: "Engr. Carlos Mendoza",
    budget: 2200000,
    startDate: "2024-07-01",
    endDate: "2025-06-30",
    schools: 28,
  },
  {
    id: 3,
    name: "Digital Literacy Initiative",
    participants: 15200,
    progress: 82,
    status: "active",
    coordinator: "Ms. Patricia Reyes",
    budget: 1800000,
    startDate: "2024-08-15",
    endDate: "2025-07-31",
    schools: 42,
  },
  {
    id: 4,
    name: "Arts and Culture Program",
    participants: 6500,
    progress: 70,
    status: "active",
    coordinator: "Mr. Juan Dela Cruz",
    budget: 950000,
    startDate: "2024-09-01",
    endDate: "2025-08-15",
    schools: 25,
  },
]

// Sample notifications
const notifications = [
  {
    id: 1,
    title: "New Announcement",
    message: "School Calendar for 2025-2026 has been released",
    time: "10 minutes ago",
    read: false,
    type: "announcement",
  },
  {
    id: 2,
    title: "Task Reminder",
    message: "Submit quarterly report due in 2 days",
    time: "1 hour ago",
    read: false,
    type: "task",
  },
  {
    id: 3,
    title: "Event Update",
    message: "Division Science Fair location has been changed",
    time: "3 hours ago",
    read: true,
    type: "event",
  },
  {
    id: 4,
    title: "System Notification",
    message: "Database backup completed successfully",
    time: "Yesterday",
    read: true,
    type: "system",
  },
]

// Sample recent activities
const recentActivities = [
  {
    id: 1,
    action: "Updated",
    item: "School Calendar",
    user: "Dr. Maria Santos",
    time: "10 minutes ago",
  },
  {
    id: 2,
    action: "Added",
    item: "New Announcement",
    user: "Prof. Carlos Mendoza",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "Completed",
    item: "Budget Review",
    user: "Mr. Roberto Tan",
    time: "3 hours ago",
  },
  {
    id: 4,
    action: "Scheduled",
    item: "Teacher Training Workshop",
    user: "Dr. Elena Cruz",
    time: "Yesterday",
  },
]

// Dummy component to avoid the error
const QuickEdit = () => {
  return null
}

export default function DashboardView() {
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState(0)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)
  const [darkMode, setDarkMode] = useState(false)
  const [filterYear, setFilterYear] = useState("2025")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Handle clicks outside notifications panel
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const markAllAsRead = () => {
    setUnreadCount(0)
  }

  const dismissWelcomeMessage = () => {
    setShowWelcomeMessage(false)
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">DepEd Cabuyao Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Welcome back, <span className="font-medium">Administrator</span> | Last login: Today, 8:45 AM
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8" />
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{format(date || new Date(), "PPP")}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {showNotifications && (
                <div
                  ref={notificationsRef}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              notification.type === "announcement"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                                : notification.type === "task"
                                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
                                  : notification.type === "event"
                                    ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                                    : "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                            }`}
                          >
                            {notification.type === "announcement" ? (
                              <BellIcon className="h-4 w-4" />
                            ) : notification.type === "task" ? (
                              <ClipboardListIcon className="h-4 w-4" />
                            ) : notification.type === "event" ? (
                              <CalendarIcon className="h-4 w-4" />
                            ) : (
                              <InfoIcon className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="dark-mode" className="sr-only">
                Dark Mode
              </Label>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              <span className="text-sm text-gray-500 dark:text-gray-400">Dark Mode</span>
            </div>

            <Button className="bg-green-600 hover:bg-green-700">
              <PlusIcon className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      {showWelcomeMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-lg shadow-sm relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-white hover:bg-white/20"
            onClick={dismissWelcomeMessage}
          >
            <XIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
              <BellRingIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Welcome to the DepEd Cabuyao Dashboard</h2>
              <p className="text-white/90">
                This dashboard provides real-time insights into the education system in Cabuyao. Explore the different
                tabs to view detailed information about schools, students, teachers, and programs.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
        >
          <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
              <SchoolIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Schools</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">42</h3>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />2 new
                </Badge>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>By type:</span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                Elementary: 24
              </span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                High School: 18
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
        >
          <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
              <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Students</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">24,850</h3>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  3.2%
                </Badge>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Gender ratio:</span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-1"></span>
                Female: 12,400
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
        >
          <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
              <UserIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Teachers</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">1,245</h3>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  2.5%
                </Badge>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Qualification:</span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                Licensed: 98%
              </span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                Masters: 45%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
        >
          <div className="flex items-center p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="h-12 w-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-4">
              <BookOpenIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Programs</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">18</h3>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />4 new
                </Badge>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <span>Status:</span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                Active: 14
              </span>
              <span className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                Planned: 4
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
