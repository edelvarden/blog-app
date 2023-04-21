import Heading from "@/components/common/Heading"
import Layout from "@/components/layout/Layout"
import { FC } from "react"

const NotFound: FC = () => {
  return (
    <Layout title="Not found">
      <div className="my-4">
        <div className="mx-4 text-center">
          <Heading level={1}>Not found</Heading>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound
