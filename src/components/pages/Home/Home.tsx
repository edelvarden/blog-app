import ArticlesList from "@/components/common/ArticlesList"
import Layout from "@/components/layout/Layout"
import { FC } from "react"

const Home: FC = () => {
  return (
    <Layout title="Blog">
      <div className="my-8">
        <div className="mx-4 text-center">
          <h1>Articles</h1>
        </div>

        <div className="mt-[2em]">
          <ArticlesList />
        </div>
      </div>
    </Layout>
  )
}

export default Home
