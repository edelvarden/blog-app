import { getAllPostsForHome } from "@/lib/api"
import { CMS_NAME } from "@/lib/constants"
import { PostType } from "@/types"

import Container from "@/components/container"
import Layout from "@/components/layout"
import MoreStories from "@/components/more-stories"
import Slider from "@/components/slider"

type IndexProps = {
  allPosts: PostType[]
  preview: boolean
}

const Index = (props: IndexProps) => {
  const { allPosts } = props

  return (
    <Layout title={`Next.js Blog Example with ${CMS_NAME}`}>
      <Container >
        <Slider posts={allPosts} />
      </Container>
      <Container>
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
      </Container>
    </Layout>
  )
}

export default Index

type staticProps = {
  preview: boolean
}

export const getStaticProps = async (props: staticProps) => {
  const { preview = null } = props
  const allPosts = (await getAllPostsForHome(preview)) || []
  return {
    props: { allPosts, preview },
  }
}
