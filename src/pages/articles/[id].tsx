import ArticleContent from "@/components/screens/ArticleContent"
import NotFound from "@/pages/404"
import { NextPage } from "next"
import { useRouter } from "next/router"

const ArticlePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  console.log(`${id}`);
  

  if (!id) {
    return <NotFound />
  }

  return <ArticleContent id={+`${id}`} title={``} date={``} body={``} />
}

export default ArticlePage
