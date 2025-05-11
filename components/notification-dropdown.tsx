"use client"

import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BellIcon, CheckIcon, FileTextIcon, CalendarIcon, BookOpenIcon, UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "announcement" | "event" | "document" | "system" | "user"
}

// Update the component interface:
interface NotificationDropdownProps {
  isScrolled?: boolean
}

// Update the component definition:
export default function NotificationDropdown({ isScrolled }: NotificationDropdownProps = {}) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching notifications
    setTimeout(() => {
      const sampleNotifications: Notification[] = [
        {
          id: "1",
          title: "New Curriculum Update",
          message: "The new K-12 curriculum guidelines have been published.",
          time: "10 minutes ago",
          read: false,
          type: "announcement",
        },
        {
          id: "2",
          title: "Upcoming Teacher Training",
          message: "Don't forget about the teacher training workshop on Friday.",
          time: "2 hours ago",
          read: false,
          type: "event",
        },
        {
          id: "3",
          title: "Document Approval",
          message: "Your submitted document has been approved.",
          time: "Yesterday",
          read: false,
          type: "document",
        },
        {
          id: "4",
          title: "System Maintenance",
          message: "The system will be under maintenance this weekend.",
          time: "2 days ago",
          read: true,
          type: "system",
        },
        {
          id: "5",
          title: "New User Registration",
          message: "A new user has registered and needs approval.",
          time: "3 days ago",
          read: true,
          type: "user",
        },
      ]

      setNotifications(sampleNotifications)
      setUnreadCount(sampleNotifications.filter((n) => !n.read).length)
      setIsLoading(false)
    }, 1000)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return <FileTextIcon className="h-4 w-4 text-blue-500" />
      case "event":
        return <CalendarIcon className="h-4 w-4 text-green-500" />
      case "document":
        return <BookOpenIcon className="h-4 w-4 text-orange-500" />
      case "system":
        return <BellIcon className="h-4 w-4 text-red-500" />
      case "user":
        return <UserIcon className="h-4 w-4 text-purple-500" />
      default:
        return <BellIcon className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`relative ${
            isScrolled
              ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
              : "text-white hover:bg-blue-800/50"
          }`}
        >
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
          ) : (
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                  <div
                    className={`w-full p-3 flex gap-3 cursor-pointer ${notification.read ? "bg-white" : "bg-blue-50"} hover:bg-gray-100`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className={`text-sm font-medium ${notification.read ? "text-gray-700" : "text-blue-800"}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-2 text-blue-500 hover:text-blue-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                          >
                            <CheckIcon className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-blue-600 cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
