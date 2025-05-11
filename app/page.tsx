import NewsContainer from "@/components/news-container"
import type { NewsItem, Event } from "@/lib/types"

export default function Home() {
  // Sample news data related to DepEd
  const newsData: NewsItem[] = [
    {
      id: 1,
      title: "New Learning Modules Released",
      content:
        "DepEd Cabuyao has released new learning modules for Grade 10 students. The modules include interactive content and updated information on the latest curriculum changes. These materials are designed to support teachers and enhance the learning experience for students across Cabuyao, Laguna.",
      date: "2025-03-15",
      category: "Curriculum",
      image: "/placeholder.svg?height=200&width=300",
      author: "Dr. Maria Santos",
      location: "Cabuyao, Laguna",
    },
    {
      id: 2,
      title: "Upcoming Brigada Eskwela",
      content:
        "Get ready for Brigada Eskwela! This year, schools in Cabuyao, Laguna are gearing up for a safe and successful campaign to clean and prepare school facilities ahead of the new academic year. Community participation is encouraged to ensure a welcoming environment for students.",
      date: "2025-03-10",
      category: "Events",
      image: "/placeholder.svg?height=200&width=300",
      author: "Engr. Juan Dela Cruz",
      location: "Cabuyao, Laguna",
    },
    {
      id: 3,
      title: "Online Learning Platforms Update",
      content:
        "DepEd Cabuyao has announced significant updates to its online learning platforms. The improvements aim to enhance accessibility, performance, and user experience for both students and educators in Cabuyao, Laguna, ensuring quality education reaches every learner.",
      date: "2025-03-05",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=300",
      author: "Ms. Ana Lim",
      location: "Cabuyao, Laguna",
    },
    {
      id: 4,
      title: "Teacher Training Workshops Announced",
      content:
        "DepEd Cabuyao will be conducting a series of teacher training workshops throughout Laguna. These workshops aim to equip educators with the latest teaching methodologies and tools to enhance classroom instruction and student engagement in Cabuyao schools.",
      date: "2025-03-01",
      category: "Training",
      image: "/placeholder.svg?height=200&width=300",
      author: "Prof. Carlos Mendoza",
      location: "Cabuyao, Laguna",
    },
    {
      id: 5,
      title: "School Calendar for 2025-2026 Released",
      content:
        "The Department of Education Cabuyao, Laguna has officially released the school calendar for the academic year 2025-2026. The calendar includes important dates, holidays, and examination periods that schools across Cabuyao should follow.",
      date: "2025-02-25",
      category: "Announcements",
      image: "/placeholder.svg?height=200&width=300",
      author: "Dr. Roberto Garcia",
      location: "Cabuyao, Laguna",
    },
    {
      id: 6,
      title: "New Assessment Guidelines for SY 2025-2026",
      content:
        "DepEd Cabuyao has issued new assessment guidelines for the upcoming school year. The guidelines aim to provide a more holistic evaluation of student performance, focusing on both academic achievement and character development.",
      date: "2025-02-20",
      category: "Assessment",
      image: "/placeholder.svg?height=200&width=300",
      author: "Dr. Elena Cruz",
      location: "Cabuyao, Laguna",
    },
    {
      id: 7,
      title: "School Building Renovation Project Begins",
      content:
        "The City Government of Cabuyao, in partnership with DepEd, has initiated a comprehensive school building renovation project. The project aims to improve the infrastructure of several schools in the division to provide better learning environments for students.",
      date: "2025-02-15",
      category: "Infrastructure",
      image: "/placeholder.svg?height=200&width=300",
      author: "Engr. Paolo Reyes",
      location: "Cabuyao, Laguna",
    },
  ]

  // Sample events data
  const eventsData: Event[] = [
    {
      id: 1,
      title: "Division Science Fair",
      date: "2025-04-15",
      time: "8:00 AM - 5:00 PM",
      location: "Cabuyao Central School",
      description: "Annual science fair showcasing student projects from all schools in Cabuyao, Laguna.",
    },
    {
      id: 2,
      title: "Teachers' Day Celebration",
      date: "2025-04-22",
      time: "9:00 AM - 3:00 PM",
      location: "Cabuyao City Hall Auditorium",
      description: "Special event honoring teachers from all schools in the Cabuyao Schools Division.",
    },
    {
      id: 3,
      title: "Division Athletic Meet",
      date: "2025-05-10",
      time: "7:00 AM - 6:00 PM",
      location: "Cabuyao Sports Complex",
      description: "Annual sports competition between schools in the Cabuyao Schools Division.",
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      date: "2025-05-20",
      time: "1:00 PM - 5:00 PM",
      location: "All Schools in Cabuyao",
      description: "End of school year parent-teacher meetings to discuss student progress.",
    },
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <NewsContainer newsData={newsData} eventsData={eventsData} />
    </main>
  )
}
