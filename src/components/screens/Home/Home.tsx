import { FC, useEffect } from "react"
import BlogList from "@/components/common/BlogList"
import "./Home.scss"

interface IArticles {
  id: number
  title: string
  body: string
  author?: string
  date?: string
  category?: string
  excerpt?: string
  image?: string
}

interface IHomeProps {
  articles: IArticles[]
}

const Home: FC<IHomeProps> = ({ articles }) => {
  useEffect(() => {
    document.title = "Blog"
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <>
      <div className="home">
        <h1 className="home__title">Articles</h1>

        <BlogList articles={articles} />
      </div>
    </>
  )
}

export default Home
