"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SearchIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ExternalLinkIcon,
  ListIcon,
  MapIcon,
  FilterIcon,
  InfoIcon,
} from "lucide-react"
import GoogleMap from "./google-map"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface School {
  id: number
  name: string
  type: "Elementary" | "High School" | "Senior High"
  address: string
  phone: string
  email: string
  principal: string
  website?: string
  coordinates: {
    lat: number
    lng: number
  }
}

// Sample data for schools in Cabuyao
const schoolsData: School[] = [
  {
    id: 1,
    name: "Cabuyao Central School",
    type: "Elementary",
    address: "Poblacion Uno, Cabuyao City, Laguna",
    phone: "(049) 531-2465",
    email: "cabuyao.central@deped.gov.ph",
    principal: "Dr. Maria Santos",
    website: "https://www.facebook.com/CabuyaoCentralSchool/",
    coordinates: {
      lat: 14.2724,
      lng: 121.1226,
    },
  },
  {
    id: 2,
    name: "Cabuyao National High School",
    type: "High School",
    address: "Poblacion Dos, Cabuyao City, Laguna",
    phone: "(049) 531-2789",
    email: "cabuyao.nhs@deped.gov.ph",
    principal: "Dr. Juan Reyes",
    website: "https://www.facebook.com/CabuyaoNHS/",
    coordinates: {
      lat: 14.2756,
      lng: 121.1245,
    },
  },
  {
    id: 3,
    name: "Pulo National High School",
    type: "High School",
    address: "Barangay Pulo, Cabuyao City, Laguna",
    phone: "(049) 502-5678",
    email: "pulo.nhs@deped.gov.ph",
    principal: "Mrs. Elena Cruz",
    coordinates: {
      lat: 14.2612,
      lng: 121.1198,
    },
  },
  {
    id: 4,
    name: "Banay-Banay Elementary School",
    type: "Elementary",
    address: "Barangay Banay-Banay, Cabuyao City, Laguna",
    phone: "(049) 502-1234",
    email: "banaybanay.es@deped.gov.ph",
    principal: "Mr. Carlos Mendoza",
    coordinates: {
      lat: 14.2534,
      lng: 121.1156,
    },
  },
  {
    id: 5,
    name: "Cabuyao Integrated School",
    type: "Senior High",
    address: "Barangay Sala, Cabuyao City, Laguna",
    phone: "(049) 502-8901",
    email: "cabuyao.is@deped.gov.ph",
    principal: "Dr. Ana Lim",
    website: "https://www.facebook.com/CabuyaoIntegratedSchool/",
    coordinates: {
      lat: 14.2801,
      lng: 121.1289,
    },
  },
  {
    id: 6,
    name: "Marinig Elementary School",
    type: "Elementary",
    address: "Barangay Marinig, Cabuyao City, Laguna",
    phone: "(049) 502-3456",
    email: "marinig.es@deped.gov.ph",
    principal: "Mrs. Patricia Gomez",
    coordinates: {
      lat: 14.2678,
      lng: 121.1345,
    },
  },
  {
    id: 7,
    name: "Bigaa National High School",
    type: "High School",
    address: "Barangay Bigaa, Cabuyao City, Laguna",
    phone: "(049) 502-7890",
    email: "bigaa.nhs@deped.gov.ph",
    principal: "Mr. Roberto Garcia",
    coordinates: {
      lat: 14.2845,
      lng: 121.1178,
    },
  },
  {
    id: 8,
    name: "Gulod National High School",
    type: "High School",
    address: "Barangay Gulod, Cabuyao City, Laguna",
    phone: "(049) 502-4567",
    email: "gulod.nhs@deped.gov.ph",
    principal: "Dr. Javier Santos",
    coordinates: {
      lat: 14.2589,
      lng: 121.1312,
    },
  },
]

export default function SchoolLocator() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSchools, setFilteredSchools] = useState<School[]>(schoolsData)
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [sortBy, setSortBy] = useState<string>("name")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let results = schoolsData

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (school) =>
          school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.principal.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by school type
    if (activeTab !== "all") {
      results = results.filter((school) => school.type.toLowerCase() === activeTab.toLowerCase())
    }

    // Sort results
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "type":
          return a.type.localeCompare(b.type)
        case "principal":
          return a.principal.localeCompare(b.principal)
        default:
          return 0
      }
    })

    setFilteredSchools(results)
  }, [searchTerm, activeTab, sortBy])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school)
    setViewMode("map")
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "map" : "list")
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">School Locator</h2>
        <p className="text-lg">
          Find schools in the City Schools Division of Cabuyao, Laguna. Search by name, address, or browse by school
          type.
        </p>
      </motion.div>

      <Card className="overflow-hidden">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for schools by name, address, or principal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:border-blue-500"
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <FilterIcon className="h-4 w-4" />
                Filters
              </Button>

              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={toggleViewMode}
                className="flex items-center gap-2"
              >
                {viewMode === "list" ? (
                  <>
                    <MapIcon className="h-4 w-4" />
                    Map View
                  </>
                ) : (
                  <>
                    <ListIcon className="h-4 w-4" />
                    List View
                  </>
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        School Type
                      </label>
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-4 w-full">
                          <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                          >
                            All Schools
                          </TabsTrigger>
                          <TabsTrigger
                            value="elementary"
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                          >
                            Elementary
                          </TabsTrigger>
                          <TabsTrigger
                            value="high school"
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                          >
                            High School
                          </TabsTrigger>
                          <TabsTrigger
                            value="senior high"
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                          >
                            Senior High
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort By</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">School Name</SelectItem>
                          <SelectItem value="type">School Type</SelectItem>
                          <SelectItem value="principal">Principal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4">
            {viewMode === "map" ? (
              <div className="space-y-4">
                <div className="h-[500px] w-full rounded-lg overflow-hidden border border-gray-200">
                  {selectedSchool ? (
                    <GoogleMap
                      address={selectedSchool.address}
                      zoom={16}
                      coordinates={`${selectedSchool.coordinates.lat},${selectedSchool.coordinates.lng}`}
                      showDirections={true}
                      showNearbySchools={true}
                    />
                  ) : (
                    <GoogleMap address="Cabuyao, Laguna" zoom={13} showNearbySchools={true} />
                  )}
                </div>

                {selectedSchool && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-blue-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-blue-800">{selectedSchool.name}</h3>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            {selectedSchool.type}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <MapPinIcon className="h-5 w-5 text-blue-700 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{selectedSchool.address}</span>
                            </div>
                            <div className="flex items-start">
                              <PhoneIcon className="h-5 w-5 text-blue-700 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{selectedSchool.phone}</span>
                            </div>
                            <div className="flex items-start">
                              <MailIcon className="h-5 w-5 text-blue-700 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{selectedSchool.email}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <InfoIcon className="h-5 w-5 text-blue-700 mt-0.5 mr-2 flex-shrink-0" />
                              <div>
                                <p className="text-gray-700 dark:text-gray-300">
                                  <strong>Principal:</strong> {selectedSchool.principal}
                                </p>
                              </div>
                            </div>
                            {selectedSchool.website && (
                              <a
                                href={selectedSchool.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:underline mt-2"
                              >
                                <ExternalLinkIcon className="h-4 w-4 mr-1" />
                                Visit Website
                              </a>
                            )}
                            <Button variant="outline" size="sm" onClick={() => setViewMode("list")} className="mt-2">
                              <ListIcon className="h-4 w-4 mr-2" />
                              Back to List
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSchools.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No schools found matching your search criteria.</p>
                  </div>
                ) : (
                  filteredSchools.map((school) => (
                    <motion.div
                      key={school.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className="h-full hover:shadow-lg transition-shadow cursor-pointer border-blue-100 dark:border-blue-900"
                        onClick={() => handleSchoolSelect(school)}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400">{school.name}</h3>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            >
                              {school.type}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start">
                              <MapPinIcon className="h-4 w-4 text-blue-700 dark:text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400">{school.address}</span>
                            </div>
                            <div className="flex items-start">
                              <PhoneIcon className="h-4 w-4 text-blue-700 dark:text-blue-500 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400">{school.phone}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                              <strong>Principal:</strong> {school.principal}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 w-full border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSchoolSelect(school)
                            }}
                          >
                            <MapPinIcon className="h-4 w-4 mr-2" />
                            View on Map
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
