"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  BookOpenIcon,
  FileTextIcon,
  FileIcon,
  VideoIcon,
  ImageIcon,
  FolderIcon,
  BookmarkIcon,
  EyeIcon,
} from "lucide-react"
import { motion } from "framer-motion"

export default function ResourceLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedResourceType, setSelectedResourceType] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "K-12 Science Curriculum Guide",
      description:
        "Comprehensive curriculum guide for K-12 Science subjects with detailed competencies and learning outcomes.",
      type: "document",
      format: "PDF",
      fileSize: "4.2 MB",
      category: "curriculum",
      gradeLevel: "K-12",
      subject: "Science",
      downloadUrl: "#",
      dateAdded: "2025-02-15",
      downloads: 1245,
      featured: true,
    },
    {
      id: 2,
      title: "Mathematics Lesson Plan Template",
      description: "Standardized template for creating effective Mathematics lesson plans with examples.",
      type: "document",
      format: "DOCX",
      fileSize: "1.8 MB",
      category: "lesson-plans",
      gradeLevel: "All Levels",
      subject: "Mathematics",
      downloadUrl: "#",
      dateAdded: "2025-02-10",
      downloads: 987,
      featured: false,
    },
    {
      id: 3,
      title: "English Language Arts Activities",
      description: "Collection of interactive activities and worksheets for English Language Arts classes.",
      type: "worksheet",
      format: "PDF",
      fileSize: "3.5 MB",
      category: "activities",
      gradeLevel: "Elementary",
      subject: "English",
      downloadUrl: "#",
      dateAdded: "2025-02-05",
      downloads: 756,
      featured: false,
    },
    {
      id: 4,
      title: "Classroom Management Strategies",
      description:
        "Effective strategies and techniques for managing classroom behavior and creating a positive learning environment.",
      type: "document",
      format: "PDF",
      fileSize: "2.1 MB",
      category: "professional-development",
      gradeLevel: "All Levels",
      subject: "Education",
      downloadUrl: "#",
      dateAdded: "2025-01-28",
      downloads: 1532,
      featured: true,
    },
    {
      id: 5,
      title: "Filipino Culture and History Presentation",
      description:
        "Comprehensive presentation slides on Filipino culture, traditions, and historical events for Social Studies classes.",
      type: "presentation",
      format: "PPTX",
      fileSize: "5.7 MB",
      category: "presentations",
      gradeLevel: "High School",
      subject: "Social Studies",
      downloadUrl: "#",
      dateAdded: "2025-01-20",
      downloads: 645,
      featured: false,
    },
    {
      id: 6,
      title: "Science Laboratory Safety Guidelines",
      description:
        "Essential safety guidelines and procedures for conducting science experiments in school laboratories.",
      type: "document",
      format: "PDF",
      fileSize: "1.5 MB",
      category: "guidelines",
      gradeLevel: "Middle School, High School",
      subject: "Science",
      downloadUrl: "#",
      dateAdded: "2025-01-15",
      downloads: 876,
      featured: false,
    },
    {
      id: 7,
      title: "Interactive Math Games and Activities",
      description: "Collection of interactive games and activities to make learning mathematics fun and engaging.",
      type: "interactive",
      format: "HTML",
      fileSize: "8.2 MB",
      category: "activities",
      gradeLevel: "Elementary",
      subject: "Mathematics",
      downloadUrl: "#",
      dateAdded: "2025-01-10",
      downloads: 1876,
      featured: true,
    },
    {
      id: 8,
      title: "Educational Video: Photosynthesis Process",
      description:
        "High-quality educational video explaining the process of photosynthesis with animations and examples.",
      type: "video",
      format: "MP4",
      fileSize: "45.8 MB",
      category: "multimedia",
      gradeLevel: "Middle School",
      subject: "Science",
      downloadUrl: "#",
      dateAdded: "2025-01-05",
      downloads: 987,
      featured: false,
    },
    {
      id: 9,
      title: "Assessment and Evaluation Tools",
      description:
        "Comprehensive collection of assessment tools, rubrics, and evaluation methods for various subjects.",
      type: "document",
      format: "PDF",
      fileSize: "2.8 MB",
      category: "assessment",
      gradeLevel: "All Levels",
      subject: "Education",
      downloadUrl: "#",
      dateAdded: "2024-12-20",
      downloads: 1245,
      featured: false,
    },
    {
      id: 10,
      title: "Art and Music Teaching Resources",
      description: "Creative teaching resources, activity ideas, and lesson plans for art and music education.",
      type: "document",
      format: "PDF",
      fileSize: "4.5 MB",
      category: "lesson-plans",
      gradeLevel: "Elementary, Middle School",
      subject: "Arts",
      downloadUrl: "#",
      dateAdded: "2024-12-15",
      downloads: 543,
      featured: false,
    },
    {
      id: 11,
      title: "Physical Education Activity Guide",
      description:
        "Comprehensive guide with various physical activities, games, and sports suitable for different age groups.",
      type: "document",
      format: "PDF",
      fileSize: "3.7 MB",
      category: "activities",
      gradeLevel: "All Levels",
      subject: "Physical Education",
      downloadUrl: "#",
      dateAdded: "2024-12-10",
      downloads: 765,
      featured: false,
    },
    {
      id: 12,
      title: "Technology Integration in Education",
      description:
        "Guide on effectively integrating technology in classroom teaching with practical examples and tools.",
      type: "document",
      format: "PDF",
      fileSize: "2.9 MB",
      category: "professional-development",
      gradeLevel: "All Levels",
      subject: "Education",
      downloadUrl: "#",
      dateAdded: "2024-12-05",
      downloads: 1432,
      featured: true,
    },
  ]

  // Filter resources based on selected filters
  const filteredResources = resources.filter((resource) => {
    // Filter by search query
    if (
      searchQuery &&
      !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by category
    if (selectedCategory !== "all" && resource.category !== selectedCategory) {
      return false
    }

    // Filter by grade level
    if (selectedGradeLevel !== "all" && !resource.gradeLevel.includes(selectedGradeLevel)) {
      return false
    }

    // Filter by subject
    if (selectedSubject !== "all" && resource.subject !== selectedSubject) {
      return false
    }

    // Filter by resource type
    if (selectedResourceType !== "all" && resource.type !== selectedResourceType) {
      return false
    }

    return true
  })

  // Get unique categories, grade levels, subjects, and resource types for filters
  const categories = [...new Set(resources.map((resource) => resource.category))]
  const gradeLevels = ["Elementary", "Middle School", "High School", "All Levels"]
  const subjects = [...new Set(resources.map((resource) => resource.subject))]
  const resourceTypes = [...new Set(resources.map((resource) => resource.type))]

  // Get featured resources
  const featuredResources = resources.filter((resource) => resource.featured)

  // Get resource icon based on type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileTextIcon className="h-10 w-10 text-blue-600" />
      case "video":
        return <VideoIcon className="h-10 w-10 text-red-600" />
      case "image":
        return <ImageIcon className="h-10 w-10 text-green-600" />
      case "presentation":
        return <FileIcon className="h-10 w-10 text-orange-600" />
      case "worksheet":
      case "interactive":
        return <BookOpenIcon className="h-10 w-10 text-purple-600" />
      default:
        return <FileIcon className="h-10 w-10 text-gray-600" />
    }
  }

  // Get format badge color
  const getFormatBadgeColor = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "docx":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "pptx":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "mp4":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "html":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
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
          <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
          <p className="text-green-100">Access educational materials, lesson plans, and teaching resources</p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
              <FilterIcon className="h-4 w-4" />
              Filters
              <Badge className="ml-1">
                {(selectedCategory !== "all" ? 1 : 0) +
                  (selectedGradeLevel !== "all" ? 1 : 0) +
                  (selectedSubject !== "all" ? 1 : 0) +
                  (selectedResourceType !== "all" ? 1 : 0)}
              </Badge>
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Grade Level</label>
                  <Select value={selectedGradeLevel} onValueChange={setSelectedGradeLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grade Levels</SelectItem>
                      {gradeLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Resource Type</label>
                  <Select value={selectedResourceType} onValueChange={setSelectedResourceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {resourceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSelectedGradeLevel("all")
                    setSelectedSubject("all")
                    setSelectedResourceType("all")
                  }}
                  className="mr-2"
                >
                  Clear Filters
                </Button>
                <Button size="sm" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resource Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("all")}
                >
                  <FolderIcon className="h-4 w-4 mr-2" />
                  All Resources
                  <Badge className="ml-auto">{resources.length}</Badge>
                </Button>

                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <FolderIcon className="h-4 w-4 mr-2" />
                    {category
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                    <Badge className="ml-auto">{resources.filter((r) => r.category === category).length}</Badge>
                  </Button>
                ))}
              </CardContent>

              <Separator className="my-2" />

              <CardHeader>
                <CardTitle>Popular Downloads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resources
                  .sort((a, b) => b.downloads - a.downloads)
                  .slice(0, 5)
                  .map((resource) => (
                    <div key={resource.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">{getResourceIcon(resource.type)}</div>
                      <div>
                        <h4 className="text-sm font-medium">{resource.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.downloads.toLocaleString()} downloads
                        </p>
                      </div>
                    </div>
                  ))}

                <Button variant="link" className="w-full text-green-600 hover:text-green-700 mt-2">
                  View All Popular Resources
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {featuredResources.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Featured Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredResources.map((resource) => (
                    <Card
                      key={resource.id}
                      className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-gradient-to-r from-green-600 to-green-700 h-2"></div>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">{getResourceIcon(resource.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">
                                {resource.title}
                              </h3>
                              <Badge className={getFormatBadgeColor(resource.format)}>{resource.format}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{resource.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline" className="bg-gray-50">
                                {resource.gradeLevel}
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50">
                                {resource.subject}
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50">
                                {resource.fileSize}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500">
                                {new Date(resource.dateAdded).toLocaleDateString()} •{" "}
                                {resource.downloads.toLocaleString()} downloads
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <BookmarkIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <DownloadIcon className="h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">All Resources</h2>
                <div className="text-sm text-gray-500">
                  Showing {filteredResources.length} of {resources.length} resources
                </div>
              </div>

              {filteredResources.length === 0 ? (
                <Card className="border-0 shadow-md">
                  <CardContent className="p-12 text-center">
                    <SearchIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No resources found</h3>
                    <p className="text-gray-500 mb-4">We couldn't find any resources matching your search criteria.</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("all")
                        setSelectedGradeLevel("all")
                        setSelectedSubject("all")
                        setSelectedResourceType("all")
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredResources.map((resource) => (
                    <Card
                      key={resource.id}
                      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">{getResourceIcon(resource.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {resource.title}
                              </h3>
                              <Badge className={getFormatBadgeColor(resource.format)}>{resource.format}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{resource.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                {resource.gradeLevel}
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                {resource.subject}
                              </Badge>
                              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                {resource.fileSize}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500">
                                {new Date(resource.dateAdded).toLocaleDateString()} •{" "}
                                {resource.downloads.toLocaleString()} downloads
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <BookmarkIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <EyeIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <DownloadIcon className="h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mr-2">
                  Previous
                </Button>
                <Button variant="outline" className="bg-green-50 border-green-200 text-green-700">
                  1
                </Button>
                <Button variant="outline" className="ml-2">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Request Educational Resources</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find what you're looking for? Request specific teaching resources or materials from our team.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">Request Materials</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
