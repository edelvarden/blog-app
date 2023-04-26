import ArticleContent from "@/components/screens/ArticleContent"
import NotFound from "@/pages/404"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useGetArticles } from "@/hooks/useGetArticles"

const ArticlePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const articles = useGetArticles()

  if (!id) {
    return <NotFound />
  }

  const article = articles.find((article) => article.id === +id)

  if (!article) {
    return <NotFound />
  }

  return (
    <ArticleContent id={article.id} title={article.title} date={article.date} body={article.body} />
  )
}

export default ArticlePage
