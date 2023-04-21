export interface IArticle {
  id: number
  title: string
  body: string
  author?: string
  date?: string
  category?: string[] | string
  excerpt?: string
  image?: string
}
