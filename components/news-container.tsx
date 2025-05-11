"use client"

import { useState, useEffect } from "react"
import type { NewsItem, Event } from "@/lib/types"
import NewsCard from "./news-card"
import SearchBar from "./search-bar"
import AboutSection from "./about-section"
import ContactSection from "./contact-section"
import {
  AccessibilityIcon,
  BookOpenIcon,
  GraduationCapIcon,
  UsersIcon,
  BarChart3Icon,
  NewspaperIcon,
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  BellIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import QuickActions from "./quick-actions"
import HeroSection from "./hero-section"
import CookieConsent from "./cookie-consent"
import BackToTop from "./back-to-top"
import Breadcrumbs from "./breadcrumbs"
import FeedbackForm from "./feedback-form"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Header from "./header"
import Footer from "./footer"
import LoginModal from "./login-modal"
import EventCalendar from "./event-calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NewsContainerProps {
  newsData: NewsItem[]
  eventsData: Event[]
}

export default function NewsContainer({ newsData, eventsData }: NewsContainerProps) {
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(newsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [fontSize, setFontSize] = useState(16)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [activeNewsTab, setActiveNewsTab] = useState("latest")

  // Get unique categories from news data
  const categories = Array.from(new Set(newsData.map((item) => item.category)))

  useEffect(() => {
    setMounted(true)

    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark")
      }
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    let result = newsData

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory)
    }

    setFilteredNews(result)
  }, [searchTerm, selectedCategory, newsData])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setShowSearch(false)
  }

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    // Force the theme to apply immediately
    if (theme === "light") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0])
    document.documentElement.style.fontSize = `${value[0]}px`
  }

  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    if (!highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }

  // Statistics data for dashboard
  const statistics = [
    { label: "Schools", value: "42", icon: <BookOpenIcon className="h-6 w-6" />, color: "bg-green-500" },
    { label: "Students", value: "24,850", icon: <GraduationCapIcon className="h-6 w-6" />, color: "bg-emerald-500" },
    { label: "Teachers", value: "1,245", icon: <UsersIcon className="h-6 w-6" />, color: "bg-teal-500" },
    { label: "Programs", value: "18", icon: <BarChart3Icon className="h-6 w-6" />, color: "bg-lime-500" },
  ]

  // Quick links data
  const quickLinks = [
    {
      label: "School Directory",
      icon: <BookOpenIcon className="h-5 w-5" />,
      url: "/schools",
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Events Calendar",
      icon: <CalendarIcon className="h-5 w-5" />,
      url: "/academic-calendar",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Submit Documents",
      icon: <NewspaperIcon className="h-5 w-5" />,
      url: "/documents",
      color: "bg-teal-100 text-teal-700",
    },
    {
      label: "Contact Us",
      icon: <PhoneIcon className="h-5 w-5" />,
      url: "/contact",
      color: "bg-lime-100 text-lime-700",
    },
    {
      label: "Find a School",
      icon: <MapPinIcon className="h-5 w-5" />,
      url: "/schools",
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Student Portal",
      icon: <GraduationCapIcon className="h-5 w-5" />,
      url: "/student-portal",
      color: "bg-emerald-100 text-emerald-700",
    },
  ]

  // Upcoming events for dashboard
  const upcomingEvents = eventsData
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)

  const handleSearchClick = () => {
    setShowSearch(true)
    // Scroll to search section
    setTimeout(() => {
      const searchElement = document.getElementById("search-section")
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn("flex flex-col min-h-screen", highContrast && "high-contrast")}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Replace the existing header with the new Header component */}
      <Header onSearchClick={handleSearchClick} onLoginClick={handleLoginClick} />

      {/* Accessibility options */}
      <div className="bg-gray-100 border-b py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm">Font Size:</span>
            <div className="w-24">
              <Slider defaultValue={[fontSize]} min={12} max={24} step={1} onValueChange={handleFontSizeChange} />
            </div>
            <span className="text-sm">{fontSize}px</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm flex items-center gap-1"
            onClick={() => setShowAccessibility(!showAccessibility)}
          >
            <AccessibilityIcon className="h-4 w-4" />
            Accessibility Options
          </Button>
        </div>

        {showAccessibility && (
          <div className="container mx-auto mt-2 pb-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Accessibility Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="high-contrast"
                    checked={highContrast}
                    onChange={toggleHighContrast}
                    className="w-4 h-4"
                  />
                  <label htmlFor="high-contrast">High Contrast Mode</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="dark-mode"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                    className="w-4 h-4"
                  />
                  <label htmlFor="dark-mode">Dark Mode</label>
                </div>
                <div>
                  <label htmlFor="font-size" className="block mb-1">
                    Text Size
                  </label>
                  <Slider
                    id="font-size"
                    defaultValue={[fontSize]}
                    min={12}
                    max={24}
                    step={1}
                    onValueChange={handleFontSizeChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto">
        <Breadcrumbs />
      </div>

      <div className="container mx-auto px-4 py-4">
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <HeroSection onSearch={() => setShowSearch(true)} />

            {/* Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {statistics.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`${stat.color} text-white p-3 rounded-lg`}>{stat.icon}</div>
                        <div>
                          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Links Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30">
              <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">Quick Links</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.url}
                    className="flex flex-col items-center p-4 rounded-lg hover:shadow-md transition-all transform hover:-translate-y-1 dark:hover:bg-gray-700"
                  >
                    <div className={`${link.color} dark:bg-opacity-80 p-3 rounded-full mb-2`}>{link.icon}</div>
                    <span className="text-sm font-medium text-center dark:text-gray-200">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Search Section */}
            {showSearch && (
              <div id="search-section" className="bg-green-50 rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-green-800 mb-2">Search DepEd Cabuyao</h2>
                <p className="text-gray-600 mb-4">
                  Find news, announcements, and updates from the Department of Education.
                </p>
                <SearchBar onSearch={handleSearch} />
              </div>
            )}

            {/* Two-column layout for news and events */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* News section - takes up 2/3 of the space */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-green-800">Latest News & Updates</h2>
                  </div>

                  {/* Category tabs */}
                  <div className="hidden md:block mb-6">
                    <div className="flex space-x-2 overflow-x-auto">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "rounded-full px-4",
                          selectedCategory === null && "bg-green-100 text-green-700 font-medium",
                        )}
                        onClick={() => handleCategorySelect(null)}
                      >
                        All
                      </Button>
                      {categories.slice(0, 3).map((category) => (
                        <Button
                          key={category}
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-full px-4",
                            selectedCategory === category && "bg-green-100 text-green-700 font-medium",
                          )}
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </Button>
                      ))}
                      {categories.length > 3 && (
                        <Button variant="ghost" size="sm" className="rounded-full px-4">
                          More...
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Mobile category tabs */}
                  <div className="md:hidden w-full overflow-x-auto mb-4">
                    <div className="flex min-w-max space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "rounded-full px-4",
                          selectedCategory === null && "bg-green-100 text-green-700 font-medium",
                        )}
                        onClick={() => handleCategorySelect(null)}
                      >
                        All
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "rounded-full px-4",
                            selectedCategory === category && "bg-green-100 text-green-700 font-medium",
                          )}
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* News tabs */}
                  <Tabs value={activeNewsTab} onValueChange={setActiveNewsTab} className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="latest">Latest</TabsTrigger>
                      <TabsTrigger value="featured">Featured</TabsTrigger>
                      <TabsTrigger value="popular">Popular</TabsTrigger>
                    </TabsList>

                    <TabsContent value="latest">
                      {filteredNews.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <h3 className="text-xl font-semibold mb-2">No news found</h3>
                          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* Featured news - first item gets special treatment */}
                          {filteredNews.slice(0, 1).map((item) => (
                            <div
                              key={item.id}
                              className="bg-green-50 dark:bg-green-900/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                              <div className="md:flex">
                                <div className="md:w-2/5 relative h-48 md:h-auto">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute top-2 left-2">
                                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                      {item.category}
                                    </span>
                                  </div>
                                </div>
                                <div className="p-6 md:w-3/5">
                                  <h3 className="text-xl font-bold mb-3 text-green-900 dark:text-green-300 hover:text-green-700 dark:hover:text-green-200 transition-colors">
                                    {item.title}
                                  </h3>
                                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center">
                                      <CalendarIcon className="h-4 w-4 mr-1 text-green-500 dark:text-green-400" />
                                      {new Date(item.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </div>
                                    {item.author && (
                                      <div className="flex items-center">
                                        <UsersIcon className="h-4 w-4 mr-1 text-green-500 dark:text-green-400" />
                                        {item.author}
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    {item.content.substring(0, 150)}
                                    {item.content.length > 150 ? "..." : ""}
                                  </p>
                                  <Button
                                    variant="outline"
                                    className="text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/30"
                                  >
                                    Read More
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Regular news grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredNews.slice(1).map((item) => (
                              <NewsCard key={item.id} newsItem={item} />
                            ))}
                          </div>

                          {filteredNews.length > 5 && (
                            <div className="text-center pt-4">
                              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                                View All News
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="featured">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredNews
                            .filter((_, index) => index % 2 === 0)
                            .map((item) => (
                              <NewsCard key={item.id} newsItem={item} />
                            ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="popular">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredNews
                            .filter((_, index) => index % 3 === 0)
                            .map((item) => (
                              <NewsCard key={item.id} newsItem={item} />
                            ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Sidebar - takes up 1/3 of the space */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-green-800 dark:text-green-400">Upcoming Events</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEventsOpen(!isEventsOpen)}
                      className="text-green-700 dark:text-green-400"
                    >
                      {isEventsOpen ? "View Less" : "View All"}
                    </Button>
                  </div>

                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex gap-4 p-3 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        >
                          <div className="flex-shrink-0 w-14 h-14 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-lg font-bold">{new Date(event.date).getDate()}</span>
                            <span className="text-xs">
                              {new Date(event.date).toLocaleString("default", { month: "short" })}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">{event.title}</h3>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              {event.time}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400">No upcoming events</p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Button
                      variant="outline"
                      className="w-full border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30"
                      onClick={() => (window.location.href = "/academic-calendar")}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      View Academic Calendar
                    </Button>
                  </div>
                </div>

                {/* Announcements */}
                <div className="bg-gradient-to-br from-green-600 to-green-800 dark:from-green-800 dark:to-green-950 p-6 rounded-lg shadow-md dark:shadow-gray-900/30 text-white">
                  <div className="flex items-center mb-4">
                    <BellIcon className="h-5 w-5 mr-2" />
                    <h2 className="text-xl font-bold">Important Announcement</h2>
                  </div>
                  <p className="mb-4">
                    Registration for the upcoming school year 2025-2026 is now open. Please visit your nearest school or
                    register online.
                  </p>
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 dark:bg-green-900/50 dark:hover:bg-green-900/70"
                    onClick={() => (window.location.href = "/online-enrollment")}
                  >
                    Register Now
                  </Button>
                </div>

                {/* Quick Links */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30">
                  <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">Resources</h2>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/resource-library"
                        className="flex items-center p-2 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                      >
                        <BookOpenIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                        <span className="dark:text-gray-200">Learning Materials</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/documents"
                        className="flex items-center p-2 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                      >
                        <NewspaperIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                        <span className="dark:text-gray-200">Forms & Documents</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/online-enrollment"
                        className="flex items-center p-2 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                      >
                        <GraduationCapIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                        <span className="dark:text-gray-200">Enrollment Guide</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/resource-library"
                        className="flex items-center p-2 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                      >
                        <UsersIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                        <span className="dark:text-gray-200">Teacher Resources</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Events Calendar Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/30">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6">Events Calendar</h2>
              <EventCalendar events={eventsData} />
            </div>
          </div>
        )}

        {activeTab === "about" && <AboutSection />}
        {activeTab === "contact" && <ContactSection />}
        {activeTab === "resources" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Resources</h2>
            <p className="text-gray-600 mb-6">
              Access educational resources, forms, and materials for teachers, students, and parents.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Teaching Materials</h3>
                <p className="text-gray-500 mb-4">Access lesson plans, modules, and teaching guides.</p>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  View Resources
                </Button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Forms & Documents</h3>
                <p className="text-gray-500 mb-4">Download official DepEd forms and documents.</p>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  Download Forms
                </Button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Learning Materials</h3>
                <p className="text-gray-500 mb-4">Access student workbooks and learning resources.</p>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  View Materials
                </Button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Policies & Memoranda</h3>
                <p className="text-gray-500 mb-4">Access DepEd orders, memoranda, and policies.</p>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  View Policies
                </Button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Training Materials</h3>
                <p className="text-gray-500 mb-4">Access professional development resources.</p>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  View Training
                </Button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2 text-green-700">Research & Publications</h3>
                <p className="text-gray-500 mb-4">Access educational research and publications.</p>
                <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                  View Research
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Replace the existing footer with the new Footer component */}
      <Footer />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Feedback Form */}
      <FeedbackForm />

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  )
}
