"use client"

import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { GlobeIcon, CheckIcon } from "lucide-react"

type Language = "en" | "fil"

interface LanguageOption {
  code: Language
  name: string
  flag: string
}

interface LanguageSwitcherProps {
  isScrolled?: boolean
}

export default function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps = {}) {
  const [language, setLanguage] = useState<Language>("en")

  const languages: LanguageOption[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fil", name: "Filipino", flag: "🇵🇭" },
  ]

  useEffect(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fil")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)

    // In a real app, you would update the UI text based on the selected language
    // For this demo, we'll just show an alert
    alert(`Language changed to ${lang === "en" ? "English" : "Filipino"}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${
            isScrolled
              ? "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
              : "text-white hover:bg-blue-800/50"
          }`}
        >
          <GlobeIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between"
            onClick={() => changeLanguage(lang.code)}
          >
            <span>
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </span>
            {language === lang.code && <CheckIcon className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
