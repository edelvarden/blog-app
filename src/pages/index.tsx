import { getAllPostsForHome } from "@/lib/api"
import { CMS_NAME } from "@/lib/constants"
import { PostType } from "@/types"

import Container from "@/components/container"
import Layout from "@/components/layout"
import MoreStories from "@/components/more-stories"
import Slider from "@/components/slider"
import { GetStaticProps, NextPage } from "next"

type HomeProps = {
  allPosts: PostType[]
  preview: boolean
}

const Home: NextPage<HomeProps> = ({ allPosts }) => {
  return (
    <Layout title={`Next.js Blog Example with ${CMS_NAME}`}>
      <Container>
        <Slider posts={allPosts} />
      </Container>
      <Container>{allPosts.length > 0 && <MoreStories posts={allPosts} />}</Container>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps<HomeProps> = async ({ preview = false }) => {
  const allPosts = (await getAllPostsForHome(preview)) || []

  return {
    props: { allPosts, preview },
  }
}
