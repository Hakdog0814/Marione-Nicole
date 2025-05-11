"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  SearchIcon,
  FileTextIcon,
  FileIcon as FilePdfIcon,
  FileIcon,
  DownloadIcon,
  BookOpenIcon,
  VideoIcon,
  ImageIcon,
  ClipboardIcon,
} from "lucide-react"
import { motion } from "framer-motion"

interface Resource {
  id: string
  title: string
  description: string
  type: "document" | "video" | "image" | "presentation" | "worksheet"
  format: string
  fileSize: string
  category: string
  gradeLevel: string
  downloadUrl: string
  dateAdded: string
}

const resourcesData: Resource[] = [
  {
    id: "res-1",
    title: "K-12 Science Curriculum Guide",
    description:
      "Comprehensive curriculum guide for K-12 Science subjects with detailed competencies and learning outcomes.",
    type: "document",
    format: "PDF",
    fileSize: "4.2 MB",
    category: "curriculum",
    gradeLevel: "K-12",
    downloadUrl: "#",
    dateAdded: "2025-02-15",
  },
  {
    id: "res-2",
    title: "Mathematics Lesson Plan Template",
    description: "Standardized template for creating effective Mathematics lesson plans with examples.",
    type: "document",
    format: "DOCX",
    fileSize: "1.8 MB",
    category: "lesson-plans",
    gradeLevel: "All Levels",
    downloadUrl: "#",
    dateAdded: "2025-02-10",
  },
  {
    id: "res-3",
    title: "English Language Arts Activities",
    description: "Collection of interactive activities and worksheets for English Language Arts classes.",
    type: "worksheet",
    format: "PDF",
    fileSize: "3.5 MB",
    category: "activities",
    gradeLevel: "Elementary",
    downloadUrl: "#",
    dateAdded: "2025-02-05",
  },
  {
    id: "res-4",
    title: "Classroom Management Strategies",
    description:
      "Effective strategies and techniques for managing classroom behavior and creating a positive learning environment.",
    type: "document",
    format: "PDF",
    fileSize: "2.1 MB",
    category: "professional-development",
    gradeLevel: "All Levels",
    downloadUrl: "#",
    dateAdded: "2025-01-28",
  },
  {
    id: "res-5",
    title: "Filipino Culture and History Presentation",
    description:
      "Comprehensive presentation slides on Filipino culture, traditions, and historical events for Social Studies classes.",
    type: "presentation",
    format: "PPTX",
    fileSize: "5.7 MB",
    category: "social-studies",
    gradeLevel: "High School",
    downloadUrl: "#",
    dateAdded: "2025-01-20",
  },
  {
    id: "res-6",
    title: "Science Laboratory Safety Guidelines",
    description:
      "Essential safety guidelines and procedures for conducting science experiments in school laboratories.",
    type: "document",
    format: "PDF",
    fileSize: "1.5 MB",
    category: "science",
    gradeLevel: "Middle School, High School",
    downloadUrl: "#",
    dateAdded: "2025-01-15",
  },
  {
    id: "res-7",
    title: "Interactive Math Games and Activities",
    description: "Collection of interactive games and activities to make learning mathematics fun and engaging.",
    type: "worksheet",
    format: "PDF",
    fileSize: "3.2 MB",
    category: "mathematics",
    gradeLevel: "Elementary",
    downloadUrl: "#",
    dateAdded: "2025-01-10",
  },
  {
    id: "res-8",
    title: "Educational Video: Photosynthesis Process",
    description:
      "High-quality educational video explaining the process of photosynthesis with animations and examples.",
    type: "video",
    format: "MP4",
    category: "science",
    gradeLevel: "Middle School",
    downloadUrl: "#",
    dateAdded: "2025-01-05",
  },
  {
    id: "res-9",
    title: "Assessment and Evaluation Tools",
    description: "Comprehensive collection of assessment tools, rubrics, and evaluation methods for various subjects.",
    type: "document",
    format: "PDF",
    fileSize: "2.8 MB",
    category: "assessment",
    gradeLevel: "All Levels",
    downloadUrl: "#",
    dateAdded: "2024-12-20",
  },
  {
    id: "res-10",
    title: "Art and Music Teaching Resources",
    description: "Creative teaching resources, activity ideas, and lesson plans for art and music education.",
    type: "document",
    format: "PDF",
    fileSize: "4.5 MB",
    category: "arts",
    gradeLevel: "Elementary, Middle School",
    downloadUrl: "#",
    dateAdded: "2024-12-15",
  },
  {
    id: "res-11",
    title: "Physical Education Activity Guide",
    description:
      "Comprehensive guide with various physical activities, games, and sports suitable for different age groups.",
    type: "document",
    format: "PDF",
    fileSize: "3.7 MB",
    category: "physical-education",
    gradeLevel: "All Levels",
    downloadUrl: "#",
    dateAdded: "2024-12-10",
  },
  {
    id: "res-12",
    title: "Technology Integration in Education",
    description: "Guide on effectively integrating technology in classroom teaching with practical examples and tools.",
    type: "document",
    format: "PDF",
    fileSize: "2.9 MB",
    category: "professional-development",
    gradeLevel: "All Levels",
    downloadUrl: "#",
    dateAdded: "2024-12-05",
  },
]

export default function TeacherResources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resourcesData)

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "curriculum", name: "Curriculum" },
    { id: "lesson-plans", name: "Lesson Plans" },
    { id: "activities", name: "Activities" },
    { id: "assessment", name: "Assessment" },
    { id: "professional-development", name: "Professional Development" },
    { id: "science", name: "Science" },
    { id: "mathematics", name: "Mathematics" },
    { id: "social-studies", name: "Social Studies" },
    { id: "arts", name: "Arts & Music" },
    { id: "physical-education", name: "Physical Education" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    let results = resourcesData

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (activeCategory !== "all") {
      results = results.filter((resource) => resource.category === activeCategory)
    }

    setFilteredResources(results)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)

    let results = resourcesData

    // Keep search term filter
    if (searchTerm) {
      results = results.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (category !== "all") {
      results = results.filter((resource) => resource.category === category)
    }

    setFilteredResources(results)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileTextIcon className="h-10 w-10 text-blue-600" />
      case "video":
        return <VideoIcon className="h-10 w-10 text-red-600" />
      case "image":
        return <ImageIcon className="h-10 w-10 text-green-600" />
      case "presentation":
        return <ClipboardIcon className="h-10 w-10 text-orange-600" />
      case "worksheet":
        return <BookOpenIcon className="h-10 w-10 text-purple-600" />
      default:
        return <FileIcon className="h-10 w-10 text-gray-600" />
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FilePdfIcon className="h-4 w-4 text-red-500" />
      case "docx":
        return <FileTextIcon className="h-4 w-4 text-blue-500" />
      case "pptx":
        return <ClipboardIcon className="h-4 w-4 text-orange-500" />
      case "mp4":
        return <VideoIcon className="h-4 w-4 text-green-500" />
      default:
        return <FileIcon className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Teacher Resources</h2>
        <p className="text-lg">
          Access a wide range of teaching materials, lesson plans, and educational resources for educators.
        </p>
      </motion.div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for resources by title, description, or grade level..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-500"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="mb-6 overflow-x-auto">
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
              <TabsList className="inline-flex min-w-max">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <FileIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-gray-500 mb-6">We couldn't find any resources matching your search criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setActiveCategory("all")
                  setFilteredResources(resourcesData)
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow border-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{getResourceIcon(resource.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-blue-800">{resource.title}</h3>
                            <Badge variant="outline" className="flex items-center gap-1 whitespace-nowrap">
                              {getFormatIcon(resource.format)}
                              {resource.format}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                              {resource.gradeLevel}
                            </Badge>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                              {resource.fileSize}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 mb-4">
                            Added: {new Date(resource.dateAdded).toLocaleDateString()}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download Resource
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Request Resources</h3>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Request specific teaching resources or materials.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() =>
                (window.location.href = "mailto:resources.cabuyao@deped.gov.ph?subject=Resource%20Request")
              }
            >
              Request Materials
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
