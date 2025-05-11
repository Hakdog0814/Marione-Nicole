"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchIcon, BookOpenIcon, CalendarIcon, FileTextIcon, GraduationCapIcon, XIcon } from "lucide-react"
import Link from "next/link"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: "news" | "event" | "resource" | "school" | "page"
  icon: React.ReactNode
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Reset search when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("")
      setResults([])
    }
  }, [isOpen])

  // Handle search
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)

    // Save to recent searches
    if (!recentSearches.includes(searchQuery) && searchQuery.trim()) {
      const newRecentSearches = [searchQuery, ...recentSearches.slice(0, 4)]
      setRecentSearches(newRecentSearches)
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))
    }

    // Simulate search with mock data
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "news-1",
          title: "New Learning Modules Released",
          description: "DepEd Cabuyao has released new learning modules for Grade 10 students.",
          url: "/news/new-learning-modules",
          type: "news",
          icon: <FileTextIcon className="h-5 w-5 text-blue-500" />,
        },
        {
          id: "event-1",
          title: "Upcoming Brigada Eskwela",
          description:
            "Get ready for Brigada Eskwela! This year, schools in Cabuyao are gearing up for a safe campaign.",
          url: "/events/brigada-eskwela",
          type: "event",
          icon: <CalendarIcon className="h-5 w-5 text-green-500" />,
        },
        {
          id: "resource-1",
          title: "K-12 Science Curriculum Guide",
          description: "Comprehensive curriculum guide for K-12 Science subjects with detailed competencies.",
          url: "/resources/k12-science-curriculum",
          type: "resource",
          icon: <BookOpenIcon className="h-5 w-5 text-amber-500" />,
        },
        {
          id: "school-1",
          title: "Cabuyao Central School",
          description: "Elementary school located in Poblacion Uno, Cabuyao City, Laguna.",
          url: "/schools/cabuyao-central",
          type: "school",
          icon: <GraduationCapIcon className="h-5 w-5 text-purple-500" />,
        },
        {
          id: "page-1",
          title: "Academic Calendar",
          description: "View important dates, events, and schedules for the academic year.",
          url: "/academic-calendar",
          type: "page",
          icon: <CalendarIcon className="h-5 w-5 text-red-500" />,
        },
      ]

      // Filter results based on search query and active tab
      const filteredResults = mockResults.filter((result) => {
        const matchesQuery =
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTab = activeTab === "all" || result.type === activeTab

        return matchesQuery && matchesTab
      })

      setResults(filteredResults)
      setIsSearching(false)
    }, 500)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    setResults([])
  }

  // Use a recent search
  const useRecentSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      handleSearch()
    },
    [handleSearch],
  )

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="p-4 border-b">
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={clearSearch}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </form>
        </div>

        <div className="p-2 border-b">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="resource">Resources</TabsTrigger>
              <TabsTrigger value="school">Schools</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-4">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          ) : searchQuery ? (
            results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <Link href={result.url} key={result.id} onClick={onClose}>
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{result.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{result.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{result.description}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{result.url}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-2">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Try different keywords or browse categories</p>
              </div>
            )
          ) : (
            <div>
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Searches</h3>
                    <Button variant="ghost" size="sm" onClick={clearRecentSearches} className="h-auto py-1 text-xs">
                      Clear
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => useRecentSearch(search)}
                        className="text-xs"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Searches</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useRecentSearch("enrollment")}
                    className="justify-start"
                  >
                    Enrollment
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useRecentSearch("calendar")}
                    className="justify-start"
                  >
                    Academic Calendar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useRecentSearch("requirements")}
                    className="justify-start"
                  >
                    Admission Requirements
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => useRecentSearch("contact")}
                    className="justify-start"
                  >
                    Contact Information
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
          Press{" "}
          <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mx-1">
            ESC
          </kbd>{" "}
          to close or{" "}
          <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mx-1">
            Enter
          </kbd>{" "}
          to search
        </div>
      </DialogContent>
    </Dialog>
  )
}
