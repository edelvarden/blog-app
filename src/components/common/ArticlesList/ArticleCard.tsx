import RouterLink from "@/components/common/RouterLink"
import { IArticle } from "@/types"
import { FC } from "react"
import styles from "./ArticleCard.module.scss";

interface IArticlesCardProps {
  article: IArticle
}

const ArticlesCard: FC<IArticlesCardProps> = ({ article }) => {
  return (
    <RouterLink href={`/articles/${article.id}`}>
      <article>
        <h4 className={styles.title}>{article.title}</h4>
        <p className={styles.excerpt}>{!article.excerpt ? article.body : article.excerpt}</p>
      </article>
    </RouterLink>
  )
}

export default ArticlesCard
