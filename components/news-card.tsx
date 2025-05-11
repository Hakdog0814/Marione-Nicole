"use client"

import type React from "react"

import { useState } from "react"
import type { NewsItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  BookmarkIcon,
  Share2Icon,
  PrinterIcon,
  CalendarIcon,
  UserIcon,
  MapPinIcon,
  ChevronDownIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  MailIcon,
  ArrowRightIcon,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NewsCardProps {
  newsItem: NewsItem
}

export default function NewsCard({ newsItem }: NewsCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<string[]>([])
  const [newComment, setNewComment] = useState("")
  const [showShareOptions, setShowShareOptions] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, newComment])
      setNewComment("")
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const shareNews = (platform: string) => {
    const shareUrl = window.location.href
    const shareText = `${newsItem.title} - DepEd Cabuyao News`

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
          "_blank",
        )
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
          "_blank",
        )
        break
      case "email":
        window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`, "_blank")
        break
      default:
        if (navigator.share) {
          navigator
            .share({
              title: newsItem.title,
              text: newsItem.content.substring(0, 100) + "...",
              url: window.location.href,
            })
            .catch((error) => console.log("Error sharing:", error))
        } else {
          setShowShareOptions(!showShareOptions)
        }
    }
  }

  const printNews = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${newsItem.title} - DepEd Cabuyao</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              h1 { color: #0053a0; }
              .meta { color: #666; margin-bottom: 20px; }
              img { max-width: 100%; height: auto; }
              .header { border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
              .logo { height: 50px; margin-bottom: 10px; }
              .footer { border-top: 1px solid #eee; padding-top: 10px; margin-top: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>DepEd Cabuyao News</div>
            </div>
            <h1>${newsItem.title}</h1>
            <div class="meta">
              <p>Date: ${formatDate(newsItem.date)}</p>
              <p>Category: ${newsItem.category}</p>
              ${newsItem.author ? `<p>Author: ${newsItem.author}</p>` : ""}
              ${newsItem.location ? `<p>Location: ${newsItem.location}</p>` : ""}
            </div>
            <div>${newsItem.content}</div>
            <div class="footer">
              <p>Printed from DepEd Cabuyao website on ${new Date().toLocaleDateString()}</p>
              <p>© ${new Date().getFullYear()} Department of Education - City Schools Division of Cabuyao, Laguna</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 h-full flex flex-col"
    >
      <div className="relative h-48 w-full">
        <Badge className="absolute top-3 right-3 z-10 bg-blue-600 hover:bg-blue-700">{newsItem.category}</Badge>
        <Image
          src={newsItem.image || "/placeholder.svg"}
          alt={newsItem.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-300 line-clamp-2 hover:text-blue-700 dark:hover:text-blue-200 transition-colors">
          {newsItem.title}
        </h3>

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1 text-blue-500 dark:text-blue-400" />
            {formatDate(newsItem.date)}
          </div>

          {newsItem.author && (
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1 text-blue-500 dark:text-blue-400" />
              {newsItem.author}
            </div>
          )}
        </div>

        {newsItem.location && (
          <div className="flex items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
            <MapPinIcon className="h-4 w-4 mr-1 text-blue-500 dark:text-blue-400" />
            {newsItem.location}
          </div>
        )}

        <div className="mb-4 flex-1">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {expanded
              ? newsItem.content
              : `${newsItem.content.substring(0, 120)}${newsItem.content.length > 120 ? "..." : ""}`}
          </p>

          {newsItem.content.length > 120 && (
            <Button
              variant="link"
              size="sm"
              onClick={toggleExpand}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-0 h-auto font-medium mt-2"
            >
              {expanded ? "Read Less" : "Read More"}
              <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </Button>
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBookmark}
              className={`h-8 w-8 ${bookmarked ? "text-yellow-500" : "text-gray-500 hover:text-yellow-500"}`}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              <BookmarkIcon className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-500">
                  <Share2Icon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => shareNews("facebook")} className="cursor-pointer">
                  <FacebookIcon className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Facebook</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareNews("twitter")} className="cursor-pointer">
                  <TwitterIcon className="mr-2 h-4 w-4 text-blue-400" />
                  <span>Twitter</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareNews("linkedin")} className="cursor-pointer">
                  <LinkedinIcon className="mr-2 h-4 w-4 text-blue-700" />
                  <span>LinkedIn</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => shareNews("email")} className="cursor-pointer">
                  <MailIcon className="mr-2 h-4 w-4 text-gray-600" />
                  <span>Email</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={printNews}
              className="h-8 w-8 text-gray-500 hover:text-blue-500"
              aria-label="Print"
            >
              <PrinterIcon className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3"
          >
            Read Full Article
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Comments</h4>

            {comments.length > 0 ? (
              <div className="space-y-3 mb-4">
                {comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium dark:text-gray-200">User</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">Just now</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">No comments yet. Be the first to comment!</p>
            )}

            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button type="submit" size="sm" disabled={!newComment.trim()}>
                Post
              </Button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  )
}
