import ArtcilesList from "@/components/common/ArtcilesList"
import Heading from "@/components/common/Heading"
import Layout from "@/components/layout/Layout"
import { FC } from "react"

const Home: FC = () => {
  
  return (
    <Layout title="Blog">
      <div className="my-8">
        <div className="mx-4 text-center">
          <Heading level={1}>Articles</Heading>
        </div>

        <div className="mt-[2em]">
          <ArtcilesList/>
        </div>
      </div>
    </Layout>
  )
}

export default Home
