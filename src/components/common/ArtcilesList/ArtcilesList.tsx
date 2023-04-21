import Heading from "@/components/common/Heading"
import { useGetArticles } from "@/hooks/useGetArticles"
import { IArticle, IArticles } from "@/types"
import { FC } from "react"

const ArtcilesList: FC<IArticles> = () => {
  const articles = useGetArticles()

  return (
    <ul className="px-4">
      {articles?.map((article: IArticle, key: number) => (
        <li key={article.id}>
          <Heading level={4}>{article.title}</Heading>
          <p>{article.excerpt}</p>
        </li>
      ))}
    </ul>
  )
}

export default ArtcilesList
