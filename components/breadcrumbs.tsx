"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRightIcon, HomeIcon } from "lucide-react"

interface BreadcrumbsProps {
  homeElement?: React.ReactNode
  separator?: React.ReactNode
  containerClasses?: string
  listClasses?: string
  activeItemClasses?: string
  capitalizeLinks?: boolean
}

export default function Breadcrumbs({
  homeElement,
  separator = <ChevronRightIcon className="h-4 w-4" />,
  containerClasses = "py-3 px-4",
  listClasses = "flex items-center space-x-2 text-sm text-gray-500",
  activeItemClasses = "text-blue-600 font-medium",
  capitalizeLinks = true,
}: BreadcrumbsProps) {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <ol className={listClasses}>
        <li className="flex items-center">
          <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
            {homeElement || <HomeIcon className="h-4 w-4" />}
          </Link>
        </li>

        {pathNames.length > 0 && separator && <li className="flex items-center">{separator}</li>}

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`
          const itemClasses =
            index === pathNames.length - 1 ? activeItemClasses : "hover:text-blue-600 transition-colors"
          const formattedLink = capitalizeLinks
            ? link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, " ")
            : link.replace(/-/g, " ")

          return (
            <li key={index} className="flex items-center">
              <Link href={href} className={itemClasses}>
                {formattedLink}
              </Link>

              {index < pathNames.length - 1 && <span className="mx-2">{separator}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
