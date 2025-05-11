"use client"

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { PlusIcon, FileTextIcon, CalendarIcon, DownloadIcon, MessageSquareIcon, XIcon } from "lucide-react"

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg">
                    <FileTextIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Submit Document</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg">
                    <CalendarIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>View Calendar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg">
                    <DownloadIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Download Resources</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg">
                    <MessageSquareIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Contact Support</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <Button
          size="icon"
          className={`${
            isOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-full h-12 w-12 shadow-lg`}
          onClick={toggleOpen}
        >
          {isOpen ? <XIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}
