"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CalendarIcon,
  InfoIcon,
  AlertCircleIcon,
  UploadIcon,
} from "lucide-react"
import { motion } from "framer-motion"

export default function OnlineEnrollmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(20)
  const [enrollmentType, setEnrollmentType] = useState<"new" | "returning">("new")
  const [gradeLevel, setGradeLevel] = useState("")
  const [schoolYear, setSchoolYear] = useState("2025-2026")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 5

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setProgress(((currentStep + 1) / totalSteps) * 100)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setProgress(((currentStep - 1) / totalSteps) * 100)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg shadow-lg mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Online Enrollment System</h1>
          <p className="text-green-100">Complete your enrollment application for the {schoolYear} school year</p>
        </motion.div>

        {isSubmitted ? (
          <Card className="max-w-3xl mx-auto border-0 shadow-lg">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Enrollment Application Submitted!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Your enrollment application has been successfully submitted. You will receive a confirmation email
                shortly.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg inline-block mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Application Reference Number:</p>
                <p className="text-xl font-bold text-green-600">
                  ENR-
                  {Math.floor(Math.random() * 1000000)
                    .toString()
                    .padStart(6, "0")}
                </p>
              </div>
              <div className="space-y-2 mb-8">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <InfoIcon className="h-4 w-4 inline-block mr-2" />
                  Please keep your reference number for future inquiries.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <CalendarIcon className="h-4 w-4 inline-block mr-2" />
                  Your application will be processed within 3-5 business days.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  <FileTextIcon className="h-4 w-4 mr-2" />
                  Print Application
                </Button>
                <Button>
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-3xl mx-auto border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Student Enrollment Form</CardTitle>
                  <CardDescription>
                    {enrollmentType === "new" ? "New Student Registration" : "Returning Student Enrollment"}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  Step {currentStep} of {totalSteps}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <Progress value={progress} className="h-2" />
              </div>

              {currentStep === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Enrollment Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Enrollment Type</Label>
                          <RadioGroup
                            defaultValue={enrollmentType}
                            onValueChange={(value) => setEnrollmentType(value as "new" | "returning")}
                            className="flex flex-col space-y-3 mt-2"
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="new" id="new-student" />
                              <Label htmlFor="new-student" className="font-normal">
                                New Student
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="returning" id="returning-student" />
                              <Label htmlFor="returning-student" className="font-normal">
                                Returning Student
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label htmlFor="school-year">School Year</Label>
                          <Select defaultValue={schoolYear} onValueChange={setSchoolYear}>
                            <SelectTrigger id="school-year" className="mt-1">
                              <SelectValue placeholder="Select school year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2025-2026">2025-2026</SelectItem>
                              <SelectItem value="2024-2025">2024-2025</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="grade-level">Grade Level</Label>
                          <Select value={gradeLevel} onValueChange={setGradeLevel}>
                            <SelectTrigger id="grade-level" className="mt-1">
                              <SelectValue placeholder="Select grade level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kindergarten">Kindergarten</SelectItem>
                              <SelectItem value="grade1">Grade 1</SelectItem>
                              <SelectItem value="grade2">Grade 2</SelectItem>
                              <SelectItem value="grade3">Grade 3</SelectItem>
                              <SelectItem value="grade4">Grade 4</SelectItem>
                              <SelectItem value="grade5">Grade 5</SelectItem>
                              <SelectItem value="grade6">Grade 6</SelectItem>
                              <SelectItem value="grade7">Grade 7</SelectItem>
                              <SelectItem value="grade8">Grade 8</SelectItem>
                              <SelectItem value="grade9">Grade 9</SelectItem>
                              <SelectItem value="grade10">Grade 10</SelectItem>
                              <SelectItem value="grade11">Grade 11</SelectItem>
                              <SelectItem value="grade12">Grade 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {gradeLevel.startsWith("grade1") && (
                          <div>
                            <Label htmlFor="strand">Strand/Track (Senior High School)</Label>
                            <Select>
                              <SelectTrigger id="strand" className="mt-1">
                                <SelectValue placeholder="Select strand/track" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="stem">
                                  Science, Technology, Engineering, and Mathematics (STEM)
                                </SelectItem>
                                <SelectItem value="humss">Humanities and Social Sciences (HUMSS)</SelectItem>
                                <SelectItem value="abm">Accountancy, Business, and Management (ABM)</SelectItem>
                                <SelectItem value="gas">General Academic Strand (GAS)</SelectItem>
                                <SelectItem value="tvl">Technical-Vocational-Livelihood (TVL)</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="arts">Arts and Design</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {enrollmentType === "returning" && (
                          <div>
                            <Label htmlFor="lrn">Learner Reference Number (LRN)</Label>
                            <Input id="lrn" placeholder="Enter your 12-digit LRN" className="mt-1" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex gap-3">
                        <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Important Information</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            Please ensure all information provided is accurate and complete. You will need to upload
                            supporting documents in the later steps.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="middle-name">Middle Name (Optional)</Label>
                          <Input id="middle-name" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="suffix">Suffix (Optional)</Label>
                          <Input id="suffix" placeholder="Jr., III, etc." className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="birthdate">Date of Birth</Label>
                          <Input id="birthdate" type="date" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="gender">Gender</Label>
                          <Select>
                            <SelectTrigger id="gender" className="mt-1">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="nationality">Nationality</Label>
                          <Input id="nationality" defaultValue="Filipino" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="religion">Religion (Optional)</Label>
                          <Input id="religion" className="mt-1" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Complete Address</Label>
                          <Textarea id="address" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Contact Number</Label>
                          <Input id="phone" type="tel" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Parent/Guardian Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="father-name">Father's Name</Label>
                          <Input id="father-name" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="father-occupation">Father's Occupation</Label>
                          <Input id="father-occupation" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="father-contact">Father's Contact Number</Label>
                          <Input id="father-contact" type="tel" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="father-email">Father's Email (Optional)</Label>
                          <Input id="father-email" type="email" className="mt-1" />
                        </div>

                        <div className="md:col-span-2">
                          <Separator className="my-4" />
                        </div>

                        <div>
                          <Label htmlFor="mother-name">Mother's Maiden Name</Label>
                          <Input id="mother-name" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="mother-occupation">Mother's Occupation</Label>
                          <Input id="mother-occupation" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="mother-contact">Mother's Contact Number</Label>
                          <Input id="mother-contact" type="tel" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="mother-email">Mother's Email (Optional)</Label>
                          <Input id="mother-email" type="email" className="mt-1" />
                        </div>

                        <div className="md:col-span-2">
                          <Separator className="my-4" />
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex items-center space-x-2 mb-4">
                            <Checkbox id="guardian-different" />
                            <Label htmlFor="guardian-different" className="font-normal">
                              Guardian is different from parents
                            </Label>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="guardian-name">Guardian's Name</Label>
                          <Input id="guardian-name" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="guardian-relationship">Relationship to Student</Label>
                          <Input id="guardian-relationship" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="guardian-contact">Guardian's Contact Number</Label>
                          <Input id="guardian-contact" type="tel" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="guardian-email">Guardian's Email (Optional)</Label>
                          <Input id="guardian-email" type="email" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Educational Background</h3>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="last-school">Last School Attended</Label>
                          <Input id="last-school" className="mt-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="school-address">School Address</Label>
                            <Input id="school-address" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="school-year-attended">School Year Attended</Label>
                            <Input id="school-year-attended" placeholder="e.g., 2024-2025" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="grade-level-completed">Grade Level Completed</Label>
                            <Select>
                              <SelectTrigger id="grade-level-completed" className="mt-1">
                                <SelectValue placeholder="Select grade level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kindergarten">Kindergarten</SelectItem>
                                <SelectItem value="grade1">Grade 1</SelectItem>
                                <SelectItem value="grade2">Grade 2</SelectItem>
                                <SelectItem value="grade3">Grade 3</SelectItem>
                                <SelectItem value="grade4">Grade 4</SelectItem>
                                <SelectItem value="grade5">Grade 5</SelectItem>
                                <SelectItem value="grade6">Grade 6</SelectItem>
                                <SelectItem value="grade7">Grade 7</SelectItem>
                                <SelectItem value="grade8">Grade 8</SelectItem>
                                <SelectItem value="grade9">Grade 9</SelectItem>
                                <SelectItem value="grade10">Grade 10</SelectItem>
                                <SelectItem value="grade11">Grade 11</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="gwa">General Weighted Average (GWA)</Label>
                            <Input id="gwa" placeholder="e.g., 90.5" className="mt-1" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium mb-2">Academic Achievements (Optional)</h4>
                        <Textarea placeholder="List any honors, awards, or special achievements" className="h-24" />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Additional Information</h3>

                      <div className="space-y-4">
                        <div>
                          <Label>Does the student have any special needs or require accommodations?</Label>
                          <RadioGroup defaultValue="no" className="flex space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="special-needs-yes" />
                              <Label htmlFor="special-needs-yes" className="font-normal">
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="special-needs-no" />
                              <Label htmlFor="special-needs-no" className="font-normal">
                                No
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label htmlFor="special-needs-details">If yes, please provide details:</Label>
                          <Textarea id="special-needs-details" className="mt-1" />
                        </div>

                        <div>
                          <Label>Is the student a beneficiary of any scholarship or financial aid program?</Label>
                          <RadioGroup defaultValue="no" className="flex space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="scholarship-yes" />
                              <Label htmlFor="scholarship-yes" className="font-normal">
                                Yes
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="scholarship-no" />
                              <Label htmlFor="scholarship-no" className="font-normal">
                                No
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label htmlFor="scholarship-details">If yes, please specify:</Label>
                          <Input id="scholarship-details" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Required Documents</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Please upload the following required documents. Accepted file formats: PDF, JPG, PNG (max 5MB
                        per file).
                      </p>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="birth-certificate">PSA Birth Certificate</Label>
                          <div className="mt-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, JPG, PNG (max 5MB)</p>
                            <Input id="birth-certificate" type="file" className="hidden" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="report-card">Report Card (Form 138)</Label>
                          <div className="mt-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, JPG, PNG (max 5MB)</p>
                            <Input id="report-card" type="file" className="hidden" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="good-moral">Certificate of Good Moral Character</Label>
                          <div className="mt-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, JPG, PNG (max 5MB)</p>
                            <Input id="good-moral" type="file" className="hidden" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="id-picture">2x2 ID Picture</Label>
                          <div className="mt-1 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">JPG, PNG (max 2MB)</p>
                            <Input id="id-picture" type="file" className="hidden" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Terms and Conditions</h3>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox id="terms-agreement" className="mt-1" />
                          <Label htmlFor="terms-agreement" className="font-normal text-sm">
                            I certify that all information provided is true and correct to the best of my knowledge. I
                            understand that any false information may result in the denial of admission or dismissal
                            from the school.
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox id="data-privacy" className="mt-1" />
                          <Label htmlFor="data-privacy" className="font-normal text-sm">
                            I consent to the collection, use, and processing of the personal information provided in
                            this form for enrollment and academic purposes in accordance with the Data Privacy Act of
                            2012.
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox id="school-policies" className="mt-1" />
                          <Label htmlFor="school-policies" className="font-normal text-sm">
                            I agree to abide by all the rules, regulations, and policies of the school.
                          </Label>
                        </div>
                      </div>

                      <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <div className="flex gap-3">
                          <AlertCircleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">Important Notice</h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400">
                              After submission, you will receive a confirmation email with your application details.
                              Please bring original copies of all uploaded documents during the verification process.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={handlePreviousStep} disabled={currentStep === 1}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={handleNextStep}>
                  Next
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  )
}
