import { getAllPostsForHome } from "@/lib/api"
import { CMS_NAME } from "@/lib/constants"
import { PostType } from "@/types"

import Container from "@/components/container"
import HeroPost from "@/components/hero-post"
import Layout from "@/components/layout"
import MoreStories from "@/components/more-stories"

type IndexProps = {
  allPosts: PostType[]
  preview: boolean
}

const Index = (props: IndexProps) => {
  const { allPosts } = props

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <>
      <Layout title={`Next.js Blog Example with ${CMS_NAME}`}>
        <Container>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.metadata.cover_image}
              date={heroPost.created_at}
              author={heroPost.metadata.author}
              slug={heroPost.slug}
              excerpt={heroPost.metadata.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
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
