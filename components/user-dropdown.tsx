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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  UserIcon,
  Settings2Icon,
  FileTextIcon,
  LogOutIcon,
  ChevronDownIcon,
  ShieldIcon,
  BookmarkIcon,
} from "lucide-react"

interface User {
  name: string
  email: string
  role: string
  avatar: string
}

interface UserDropdownProps {
  isScrolled?: boolean
}

export default function UserDropdown({ isScrolled }: UserDropdownProps = {}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn) {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    window.location.reload()
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative h-8 flex items-center gap-2 pl-2 pr-1 ${
            isScrolled
              ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
              : "text-white hover:bg-blue-800/50"
          }`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span
            className={`text-sm font-medium hidden md:inline-block ${
              isScrolled ? "text-gray-800 dark:text-white" : "text-white"
            }`}
          >
            {user.name}
          </span>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileTextIcon className="mr-2 h-4 w-4" />
            <span>My Documents</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookmarkIcon className="mr-2 h-4 w-4" />
            <span>Saved Items</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings2Icon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          {user.role === "Admin" && (
            <DropdownMenuItem>
              <ShieldIcon className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
