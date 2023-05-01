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

export type ImgixType = {
  url: string
  imgix_url: string
}

export type AuthorType = {
  title: string
  metadata: {
    picture: ImgixType
  }
}

export type PostType = {
  title: string
  slug: string
  content: string
  created_at: string
  metadata: {
    cover_image: ImgixType
    author: AuthorType
    excerpt: string
    content: string
  }
}
