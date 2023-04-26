import { useGetArticles } from "@/hooks/useGetArticles"
import { IArticle } from "@/types"
import { FC } from "react"
import ArticlesCard from "./ArticleCard"

const ArticlesList: FC = () => {
  const articles = useGetArticles()

  return (
    <ul className="container mx-auto grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
      {articles?.map((article: IArticle, key: number) => (
        <li key={key} className="grid gap-4">
          <ArticlesCard article={article} />
        </li>
      ))}
    </ul>
  )
}

export default ArticlesList
