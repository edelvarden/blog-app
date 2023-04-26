import Layout from "@/components/layout/Layout"
import { FC } from "react"

const NotFound: FC = () => {
  return (
    <Layout title="Not found">
      <div className="my-8">
        <div className="mx-4 text-center">
          <h1>Not found</h1>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound
