import { PostType } from "@/types"
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/api"
import { CMS_NAME } from "@/lib/constants"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { ParsedUrlQueryInput } from "querystring"
import Container from "@/components/container"
import Layout from "@/components/layout"
import MoreStories from "@/components/more-stories"
import PostBody from "@/components/post-body"
import PostHeader from "@/components/post-header"
import PostTitle from "@/components/post-title"
import SectionSeparator from "@/components/section-separator"
import { FC } from "react"

type PostProps = {
  post: PostType
  morePosts: PostType[]
  preview: boolean
}

const Post: FC<PostProps> = (props) => {
  const { post, morePosts, preview } = props

  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout title={`${post.title} | Next.js Blog Example with ${CMS_NAME}`}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mx-auto max-w-[728px]">
              <PostHeader
                title={post.title}
                coverImage={post.metadata.cover_image}
                date={post.created_at}
                author={post.metadata.author}
                slug={post.slug}
              />
              <PostBody content={post.metadata.content} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}
export default Post

type staticProps = {
  params: ParsedUrlQueryInput
  preview: boolean
}

export const getStaticProps = async (props: staticProps) => {
  const { params, preview = null } = props
  try {
    const data = await getPostAndMorePosts(params.slug as string, preview)
    const content = (await data["post"]?.metadata?.content) || ""
    return {
      props: {
        preview,
        post: {
          ...data["post"],
          content,
        },
        morePosts: data["morePosts"] || [],
      },
    }
  } catch (err) {
    return <ErrorPage statusCode={err.status} />
  }
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsWithSlug()) || []
  return {
    paths: allPosts.map((post) => `/posts/${post.slug}`),
    fallback: true,
  }
}
