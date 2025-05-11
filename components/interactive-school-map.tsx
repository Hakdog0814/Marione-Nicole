"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, SearchIcon, SchoolIcon, NavigationIcon, InfoIcon, AlertCircleIcon } from "lucide-react"
import { motion } from "framer-motion"

interface School {
  id: number
  name: string
  type: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  distance?: number
}

export default function InteractiveSchoolMap() {
  const [schools, setSchools] = useState<School[]>([])
  const [filteredSchools, setFilteredSchools] = useState<School[]>([])
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Sample school data
  const schoolData: School[] = [
    {
      id: 1,
      name: "Cabuyao Central School",
      type: "Elementary",
      address: "Poblacion Uno, Cabuyao City, Laguna",
      coordinates: { lat: 14.2724, lng: 121.1226 },
    },
    {
      id: 2,
      name: "Cabuyao National High School",
      type: "High School",
      address: "Poblacion Dos, Cabuyao City, Laguna",
      coordinates: { lat: 14.2756, lng: 121.1245 },
    },
    {
      id: 3,
      name: "Pulo National High School",
      type: "High School",
      address: "Barangay Pulo, Cabuyao City, Laguna",
      coordinates: { lat: 14.2612, lng: 121.1198 },
    },
    {
      id: 4,
      name: "Banay-Banay Elementary School",
      type: "Elementary",
      address: "Barangay Banay-Banay, Cabuyao City, Laguna",
      coordinates: { lat: 14.2534, lng: 121.1156 },
    },
    {
      id: 5,
      name: "Cabuyao Integrated School",
      type: "Senior High",
      address: "Barangay Sala, Cabuyao City, Laguna",
      coordinates: { lat: 14.2801, lng: 121.1289 },
    },
  ]

  // Initialize schools on mount
  useEffect(() => {
    setSchools(schoolData)
    setFilteredSchools(schoolData)
    setMapLoaded(true)
  }, [])

  // Filter schools based on search query and selected type
  useEffect(() => {
    let results = schools

    if (searchQuery) {
      results = results.filter(
        (school) =>
          school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      results = results.filter((school) => school.type === selectedType)
    }

    // If user location is available, calculate distances
    if (userLocation) {
      results = results
        .map((school) => ({
          ...school,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            school.coordinates.lat,
            school.coordinates.lng,
          ),
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    }

    setFilteredSchools(results)
  }, [searchQuery, selectedType, schools, userLocation])

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    setIsLoadingLocation(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLoadingLocation(false)
      },
      (error) => {
        setLocationError("Unable to retrieve your location. Please enable location services.")
        setIsLoadingLocation(false)
        console.error("Error getting user location:", error)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    )
  }

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return Number.parseFloat(distance.toFixed(2))
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  // Handle school selection
  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school)
  }

  // Get directions to a school
  const getDirections = (school: School) => {
    const url = userLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${school.coordinates.lat},${school.coordinates.lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${school.coordinates.lat},${school.coordinates.lng}`

    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Interactive School Map</h2>
        <p className="text-lg">Find schools in Cabuyao, Laguna and get directions to your chosen institution</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Schools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">School Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Elementary">Elementary</SelectItem>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="Senior High">Senior High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button
                  onClick={getUserLocation}
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isLoadingLocation}
                >
                  {isLoadingLocation ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      <span>Getting location...</span>
                    </>
                  ) : (
                    <>
                      <NavigationIcon className="h-4 w-4" />
                      <span>Use My Current Location</span>
                    </>
                  )}
                </Button>

                {locationError && (
                  <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircleIcon className="h-4 w-4" />
                    <span>{locationError}</span>
                  </div>
                )}

                {userLocation && (
                  <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <InfoIcon className="h-4 w-4" />
                    <span>Location found! Schools are sorted by distance.</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pt-2">
                {filteredSchools.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <SchoolIcon className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No schools found matching your criteria</p>
                  </div>
                ) : (
                  filteredSchools.map((school) => (
                    <div
                      key={school.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedSchool?.id === school.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/10"
                      }`}
                      onClick={() => handleSchoolSelect(school)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{school.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPinIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span>{school.address}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{school.type}</Badge>
                      </div>

                      {school.distance && (
                        <div className="mt-2 text-xs text-blue-600 font-medium">
                          {school.distance} km from your location
                        </div>
                      )}

                      {selectedSchool?.id === school.id && (
                        <div className="mt-3 pt-2 border-t flex justify-end">
                          <Button size="sm" onClick={() => getDirections(school)} className="mt-2">
                            <NavigationIcon className="h-3 w-3 mr-1" />
                            Get Directions
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>School Map</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[500px] relative">
              {mapLoaded ? (
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${
                    selectedSchool
                      ? `${selectedSchool.coordinates.lat},${selectedSchool.coordinates.lng}`
                      : "Cabuyao,Laguna,Philippines"
                  }&zoom=${selectedSchool ? 16 : 13}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Map"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}

              {selectedSchool && (
                <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{selectedSchool.name}</h3>
                      <p className="text-sm text-gray-500">{selectedSchool.address}</p>
                    </div>
                    <Badge>{selectedSchool.type}</Badge>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" onClick={() => getDirections(selectedSchool)}>
                      <NavigationIcon className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
