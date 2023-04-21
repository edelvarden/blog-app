import Heading from "@/components/common/Heading"
import {useGetArticles} from "@/hooks/useGetArticles"
import { IArticle, IArticles } from "@/types"
import { FC } from "react"
import RouterLink from "../RouterLink"

const ArticlesList: FC= () => {
  const articles = useGetArticles()
  
  return (
    <ul className="px-4">
      {articles?.map((article: IArticle, key: number) => (
        <li key={key}>
          <Heading level={4}>{article.title}</Heading>
          <p>{article.excerpt}</p>
          <RouterLink href={`/articles/${article.id}`}>Read More</RouterLink>
        </li>
      ))}
    </ul>
  )
}

export default ArticlesList
