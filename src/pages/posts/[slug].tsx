import { FC } from "react"
import { ParsedUrlQueryInput } from "querystring"
import { useRouter } from "next/router"
import { GetStaticProps, GetStaticPaths } from "next"
import ErrorPage from "next/error"
import Container from "@/components/container"
import Layout from "@/components/layout"
import MoreStories from "@/components/more-stories"
import PostBody from "@/components/post-body"
import PostHeader from "@/components/post-header"
import PostTitle from "@/components/post-title"
import SectionSeparator from "@/components/section-separator"
import { CMS_NAME } from "@/lib/constants"
import { getAllPostsWithSlug, getPostAndMorePosts } from "@/lib/api"
import { PostType } from "@/types"

interface PostProps {
  post: PostType
  morePosts: PostType[]
  preview: boolean
}

const Post: FC<PostProps> = ({ post, morePosts, preview }) => {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return (
      <Layout title={`Loading... | Next.js Blog Example with ${CMS_NAME}`}>
        <Container>
          <PostTitle>Loading...</PostTitle>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout title={`${post.title} | Next.js Blog Example with ${CMS_NAME}`}>
      <Container>
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
      </Container>
    </Layout>
  )
}

export default Post

interface StaticProps {
  params: ParsedUrlQueryInput
  preview: boolean
}

export const getStaticProps = async ({ params, preview = false }: StaticProps) => {
  try {
    const { slug } = params
    const data = await getPostAndMorePosts(slug as string, preview)
    const content = data?.post?.metadata?.content || ""
    const post = { ...data?.post, content } as PostType

    return {
      props: {
        preview,
        post,
        morePosts: data?.morePosts || [],
      },
    }
  } catch (err: any) {
    return {
      props: {
        statusCode: err.status,
      },
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts?.map((post: PostType) => `/posts/${post.slug}`) || [],
    fallback: true,
  }
}
