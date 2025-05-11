"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface GoogleMapProps {
  address: string
  zoom?: number
  coordinates?: string
  showDirections?: boolean
  showNearbySchools?: boolean
}

export default function GoogleMap({
  address,
  zoom = 14,
  coordinates,
  showDirections = false,
  showNearbySchools = false,
}: GoogleMapProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Encode the address for use in the URL
  const encodedAddress = encodeURIComponent(address)

  // Create the map URL
  const getMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/place"
    const params = [
      `key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`, // This is a public API key for Google Maps embed
      `zoom=${zoom}`,
    ]

    if (coordinates) {
      // If coordinates are provided, use them
      params.push(`q=${coordinates}`)
    } else {
      // Otherwise use the address
      params.push(`q=${encodedAddress}`)
    }

    return `${baseUrl}?${params.join("&")}`
  }

  // Handle loading state
  useEffect(() => {
    setIsLoading(true)
    setError(null)

    // Simulate loading to ensure iframe has time to load
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [address, coordinates])

  // Handle errors
  const handleIframeError = () => {
    setError("Failed to load the map. Please try again later.")
    setIsLoading(false)
  }

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading map...</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-gray-600 dark:text-gray-400">
            You can view this location on Google Maps directly:
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      )}

      <iframe
        className={`w-full h-full border-0 ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={getMapUrl()}
        onError={handleIframeError}
        title={`Map of ${address}`}
        allowFullScreen
      ></iframe>

      {showDirections && !isLoading && !error && (
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg text-center">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Get Directions to this Location
          </a>
        </div>
      )}
    </div>
  )
}
