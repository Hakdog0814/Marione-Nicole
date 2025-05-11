import SchoolLocator from "@/components/school-locator"
import InteractiveSchoolMap from "@/components/interactive-school-map"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "School Locator | DepEd Cabuyao",
  description: "Find schools in the City Schools Division of Cabuyao, Laguna",
}

export default function SchoolsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <SchoolLocator />
        </TabsContent>
        <TabsContent value="map">
          <InteractiveSchoolMap />
        </TabsContent>
      </Tabs>
    </div>
  )
}
