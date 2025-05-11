"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { SearchIcon, HelpCircleIcon } from "lucide-react"
import { motion } from "framer-motion"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I enroll my child in a Cabuyao public school?",
    answer:
      "To enroll your child in a Cabuyao public school, visit the school during the enrollment period (usually April to June) with the following requirements: PSA Birth Certificate, Report Card (Form 138) from previous school, Certificate of Good Moral Character, and 2x2 ID pictures. For kindergarten, children must be at least 5 years old by August 31 of the school year.",
    category: "enrollment",
  },
  {
    id: "faq-2",
    question: "What are the requirements for transferring schools within Cabuyao?",
    answer:
      "For transferring schools within Cabuyao, you need to secure a Certificate of Transfer from the current school, along with Form 138 (Report Card), Certificate of Good Moral Character, and School ID. Submit these documents to the receiving school and complete their enrollment process.",
    category: "enrollment",
  },
  {
    id: "faq-3",
    question: "How can I request for a student's academic records?",
    answer:
      "To request academic records, submit a formal request letter to the school where the student is/was enrolled. Include the student's full name, year graduated/last attended, and purpose of the request. For parents/guardians of minors, bring valid ID. For third-party requests, an authorization letter from the student/parent is required. Processing typically takes 3-5 working days.",
    category: "records",
  },
  {
    id: "faq-4",
    question: "What is the school calendar for the current academic year?",
    answer:
      "The current school year runs from August to June, with breaks in October, December-January (Christmas break), and April (summer break). Specific dates may vary slightly each year. For the most up-to-date calendar, please visit the DepEd Cabuyao official website or contact your local school.",
    category: "general",
  },
  {
    id: "faq-5",
    question: "How can I apply for a teaching position in DepEd Cabuyao?",
    answer:
      "To apply for a teaching position, submit your application to the DepEd Cabuyao Division Office with the following requirements: Application letter, CSC Form 212 (Personal Data Sheet), Transcript of Records, PRC License, certificates of trainings/seminars, and other relevant documents. Teaching positions are typically announced at the beginning of the school year.",
    category: "employment",
  },
  {
    id: "faq-6",
    question: "What programs are available for students with special needs?",
    answer:
      "DepEd Cabuyao offers Special Education (SPED) programs in selected schools. These programs cater to students with various exceptionalities including visual, hearing, or physical impairments, and learning disabilities. For enrollment, approach the SPED centers directly with medical documentation of the child's condition. Individualized Education Programs (IEPs) are developed for each student.",
    category: "programs",
  },
  {
    id: "faq-7",
    question: "How can parents get involved in school activities?",
    answer:
      "Parents can join the Parent-Teacher Association (PTA) at their child's school. PTAs hold regular meetings and organize various activities. Parents can also volunteer during Brigada Eskwela (school maintenance program), participate in Family Day events, or serve as resource speakers. Contact your child's school for specific opportunities.",
    category: "general",
  },
  {
    id: "faq-8",
    question: "What financial assistance programs are available for students?",
    answer:
      "DepEd Cabuyao, in partnership with the local government, offers various scholarship programs for deserving students. These include the Educational Assistance Program, Special Program for the Employment of Students (SPES), and various merit-based scholarships. Requirements and application periods vary, so contact the Division Office or your school's guidance office for details.",
    category: "programs",
  },
  {
    id: "faq-9",
    question: "How do I report issues or concerns about a school or teacher?",
    answer:
      "For concerns about schools or teachers, first try to resolve the issue directly with the teacher or school principal. If unresolved, you may file a formal complaint with the DepEd Cabuyao Division Office. Submit a written complaint detailing the issue, parties involved, and supporting evidence. The Division Office will investigate according to DepEd protocols.",
    category: "general",
  },
  {
    id: "faq-10",
    question: "What extracurricular activities are available for students?",
    answer:
      "Schools in Cabuyao offer various extracurricular activities including sports (basketball, volleyball, swimming), arts (choir, dance, visual arts), academic clubs (science, math, English), and leadership programs (student council, scouting). Participation in division-wide competitions like the Palarong Pambansa qualifiers is also encouraged. Specific offerings vary by school.",
    category: "programs",
  },
  {
    id: "faq-11",
    question: "How can I get a Certificate of Good Moral Character?",
    answer:
      "To obtain a Certificate of Good Moral Character, submit a request to the school where you last studied. Bring a valid ID and any required fee. For recent graduates, the process is straightforward. For those who graduated years ago, additional verification may be needed. Processing typically takes 1-3 working days.",
    category: "records",
  },
  {
    id: "faq-12",
    question: "What are the requirements for Senior High School enrollment?",
    answer:
      "For Senior High School enrollment, students need to submit their Grade 10 completion certificate or report card, PSA Birth Certificate, Certificate of Good Moral Character, and 2x2 ID pictures. Students should also select their preferred track (Academic, TVL, Sports, or Arts and Design) and strand during enrollment.",
    category: "enrollment",
  },
]

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>(faqData)

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "enrollment", name: "Enrollment" },
    { id: "records", name: "Records" },
    { id: "programs", name: "Programs" },
    { id: "employment", name: "Employment" },
    { id: "general", name: "General" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    let results = faqData

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (activeCategory !== "all") {
      results = results.filter((faq) => faq.category === activeCategory)
    }

    setFilteredFAQs(results)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)

    let results = faqData

    // Keep search term filter
    if (searchTerm) {
      results = results.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (category !== "all") {
      results = results.filter((faq) => faq.category === category)
    }

    setFilteredFAQs(results)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg">Find answers to common questions about DepEd Cabuyao schools, programs, and services.</p>
      </motion.div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for questions or keywords..."
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

          <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
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

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircleIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-500 mb-6">We couldn't find any FAQs matching your search criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setActiveCategory("all")
                  setFilteredFAQs(faqData)
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <AccordionItem value={faq.id} className="border-b border-blue-100">
                    <AccordionTrigger className="text-left font-medium text-blue-800 hover:text-blue-600 py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      <div className="pl-2 border-l-2 border-blue-200">{faq.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Can't find what you're looking for?</h3>
            <p className="text-gray-600 mb-4">
              If you have a question that's not answered here, please contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => (window.location.href = "#contact")}
              >
                Contact Us
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => (window.location.href = "mailto:division.cabuyao@deped.gov.ph")}
              >
                Email Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
