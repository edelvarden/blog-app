import { FC, useEffect } from "react"
import BlogList from "sections/BlogList"
import "./styles.scss"

interface IArticles {
  id: number
  image: string
  category: string
  title: string
  date: string
  excerpt: string
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
