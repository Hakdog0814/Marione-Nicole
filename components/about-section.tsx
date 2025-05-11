"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("history")

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 flex justify-center">
            <Image
              src="/images/deped-cabuyao-logo.png"
              alt="DepEd Cabuyao Logo"
              width={180}
              height={180}
              className="rounded-full bg-white p-2"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">About DepEd Cabuyao</h2>
            <p className="text-gray-600 mb-4">
              The City Schools Division of Cabuyao is committed to providing quality education to all learners in
              Cabuyao, Laguna.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="history" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="mission-vision">Mission & Vision</TabsTrigger>
          <TabsTrigger value="core-values">Core Values</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-green-800 mb-4">About Us</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                The City Schools Division of Cabuyao was established on September 16, 2016 by the virtue of Republic Act
                10163; pursuant to existing DepEd–DBM organization and staffing standards, citing that a school division
                may be established in each city that shall cater the needs of both elementary and secondary school
                teachers; and in accordance with the City Charter of R.A. 9740 under Sec. 51 stipulating the
                establishment and maintenance of a school division within its territorial jurisdiction.
              </p>

              <p className="text-gray-600">
                The three storey building City Schools Division of Cabuyao Office is temporarily accommodated by Central
                Elementary School, Osmena Street, Poblacion Dos, City of Cabuyao.
              </p>

              <p className="text-gray-600">
                City Schools Division of Cabuyao office is set to be established at Barangay Pulo, City of Cabuyao with
                the land area of 2,251.13 sq. m., a portion of the parcel of land under TCT 060-2011007937 with an area
                of 12,432 sq. m. purchased by City of Cabuyao for Pulo National High School.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mission-vision">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-4">The Deped Mission</h3>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="mb-4 text-gray-600">
                    To protect and promote the right of every Filipino to quality, equitable, culture-based, and
                    complete basic education where:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Students learn in a child-friendly, gender-sensitive, safe, and motivating environment.</li>
                    <li>Teachers facilitate learning and constantly nurture every learner.</li>
                    <li>
                      Administrators and staff, as stewards of the institution, ensure an enabling and supportive
                      environment for effective learning to happen.
                    </li>
                    <li>
                      Family, community, and other stakeholders are actively engaged and share responsibility for
                      developing life-long learners.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-4">The Deped Vision</h3>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="mb-4 text-gray-600">
                    We dream of Filipinos who passionately love their country and whose values and competencies enable
                    them to realize their full potential and contribute meaningfully to building the nation.
                  </p>
                  <p className="text-gray-600">
                    As a learner-centered public institution, the Department of Education continuously improves itself
                    to better serve its stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="core-values">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-green-800 mb-6">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h4 className="text-xl font-bold mb-2">Maka-Diyos</h4>
                <p className="text-gray-600">(God-fearing)</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h4 className="text-xl font-bold mb-2">Maka-tao</h4>
                <p className="text-gray-600">(Humane)</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h4 className="text-xl font-bold mb-2">Makakalikasan</h4>
                <p className="text-gray-600">(Environment-friendly)</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg text-center">
                <h4 className="text-xl font-bold mb-2">Makabansa</h4>
                <p className="text-gray-600">(Nationalistic)</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
