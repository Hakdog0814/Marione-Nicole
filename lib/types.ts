export interface NewsItem {
  id: number
  title: string
  content: string
  date: string
  category: string
  image: string
  author?: string
  location?: string
}

export interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
}
