"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MoonIcon, SunIcon, MenuIcon, SearchIcon, PhoneIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import NotificationDropdown from "./notification-dropdown"
import UserDropdown from "./user-dropdown"
import LanguageSwitcher from "./language-switcher"
// Add a search modal component
import SearchModal from "./search-modal"

interface HeaderProps {
  onSearchClick: () => void
  onLoginClick: () => void
}

// Update the Header component to include the search modal functionality
export default function Header({ onSearchClick, onLoginClick }: HeaderProps) {
  const [activeTab, setActiveTab] = useState("home")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Apply the theme class directly to ensure immediate visual change
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Store the theme preference
    localStorage.setItem("theme", newTheme)
  }

  // Handle search click to open the search modal
  const handleSearchClick = () => {
    setIsSearchModalOpen(true)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "deped-green text-white"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-3 px-4">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`md:hidden ${
                      isScrolled
                        ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                        : "text-white hover:bg-green-800/50"
                    }`}
                  >
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                  <div className="py-4">
                    <div className="flex justify-center mb-6">
                      <Image src="/images/deped-cabuyao-logo.png" alt="DepEd Cabuyao Logo" width={100} height={100} />
                    </div>
                    <nav className="flex flex-col space-y-1">
                      <Link href="/">
                        <Button
                          variant={activeTab === "home" ? "default" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setActiveTab("home")}
                        >
                          Home
                        </Button>
                      </Link>
                      <Link href="/#about">
                        <Button
                          variant={activeTab === "about" ? "default" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setActiveTab("about")}
                        >
                          About
                        </Button>
                      </Link>
                      <Link href="/resources">
                        <Button
                          variant={activeTab === "resources" ? "default" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setActiveTab("resources")}
                        >
                          Resources
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button
                          variant={activeTab === "contact" ? "default" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setActiveTab("contact")}
                        >
                          Contact
                        </Button>
                      </Link>
                      <Link href="/schools">
                        <Button
                          variant={activeTab === "schools" ? "default" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setActiveTab("schools")}
                        >
                          Schools
                        </Button>
                      </Link>
                      <Link href="/faq">
                        <Button
                          variant={activeTab === "faq" ? "default" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setActiveTab("faq")}
                        >
                          FAQ
                        </Button>
                      </Link>
                      <Link href="/academic-calendar">
                        <Button
                          variant={activeTab === "calendar" ? "default" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setActiveTab("calendar")}
                        >
                          Academic Calendar
                        </Button>
                      </Link>
                      <Link href="/student-portal">
                        <Button
                          variant={activeTab === "portal" ? "default" : "ghost"}
                          className="justify-start w-full"
                          onClick={() => setActiveTab("portal")}
                        >
                          Student Portal
                        </Button>
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center">
                <Image
                  src="/images/deped-cabuyao-logo.png"
                  alt="DepEd Cabuyao Logo"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <h1
                  className={`text-lg md:text-xl font-bold ${
                    isScrolled ? "text-green-800 dark:text-white" : "text-white"
                  }`}
                >
                  DepEd Cabuyao Laguna
                </h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <nav className="hidden md:flex space-x-1">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className={`${
                      isScrolled
                        ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                        : "text-white hover:bg-green-800/50"
                    }`}
                    onClick={() => setActiveTab("home")}
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/#about">
                  <Button
                    variant="ghost"
                    className={`${
                      isScrolled
                        ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                        : "text-white hover:bg-green-800/50"
                    }`}
                    onClick={() => setActiveTab("about")}
                  >
                    About
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button
                    variant="ghost"
                    className={`${
                      isScrolled
                        ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                        : "text-white hover:bg-green-800/50"
                    }`}
                    onClick={() => setActiveTab("resources")}
                  >
                    Resources
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    className={`${
                      isScrolled
                        ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                        : "text-white hover:bg-green-800/50"
                    } ${activeTab === "contact" ? "bg-green-800/20" : ""}`}
                    onClick={() => setActiveTab("contact")}
                  >
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </Link>
                <Link href="/schools">
                  <Button
                    variant="ghost"
                    className={`${
                      isScrolled
                        ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                        : "text-white hover:bg-green-800/50"
                    }`}
                    onClick={() => setActiveTab("schools")}
                  >
                    Schools
                  </Button>
                </Link>
              </nav>

              <Button
                variant="ghost"
                size="icon"
                className={`${
                  isScrolled
                    ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    : "text-white hover:bg-green-800/50"
                }`}
                onClick={handleSearchClick}
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
              </Button>

              <LanguageSwitcher isScrolled={isScrolled} />

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`${
                  isScrolled
                    ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    : "text-white hover:bg-green-800/50"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>

              <NotificationDropdown isScrolled={isScrolled} />

              {isLoggedIn ? (
                <UserDropdown isScrolled={isScrolled} />
              ) : (
                <Button
                  variant={isScrolled ? "default" : "outline"}
                  className={
                    isScrolled
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-white text-green-900 hover:bg-gray-100"
                  }
                  onClick={onLoginClick}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </>
  )
}
