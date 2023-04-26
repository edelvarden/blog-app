export interface IArticle {
  id: number
  title: string
  body: string
  author?: string
  date?: string
  category?: string
  excerpt?: string
  image?: string
}

export interface IArticles {
  articles: IArticle[]
}

export interface IRoutes {
  path: string
  name: string
}

export interface INavLinks {
  routes: IRoutes[]
}
