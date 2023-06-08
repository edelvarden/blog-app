import { PostType } from "@/types"
import Cosmic from "cosmicjs"
import ErrorPage from "next/error"

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG
const READ_KEY = process.env.COSMIC_READ_KEY

const bucket = Cosmic().bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})

export const getPreviewPostBySlug = async (slug: string) => {
  const params = {
    query: {
      slug,
      type: "posts",
    },
    props: "slug",
    status: "any",
  }

  try {
    const { objects } = await bucket.getObjects(params)
    return objects[0]
  } catch (err: any) {
    // Don't throw if a slug doesn't exist
    return <ErrorPage statusCode={err.status} />
  }
}

export const getAllPostsWithSlug = async () => {
  const params = {
    query: {
      type: "posts",
    },
    props: "slug",
  }

  const { objects } = await bucket.getObjects(params)
  return objects
}

export const getAllPostsForHome = async (preview: boolean): Promise<PostType[]> => {
  const params = {
    query: {
      type: "posts",
    },
    props: "title,slug,metadata,created_at",
    sort: "-created_at",
    ...(preview && { status: "any" }),
  }

  const { objects } = await bucket.getObjects(params)
  return objects
}

export const getPostAndMorePosts = async (
  slug: string,
  preview: boolean
): Promise<{
  post: PostType
  morePosts: PostType[]
}> => {
  const singleObjectParams = {
    query: {
      slug,
      type: "posts",
    },
    props: "slug,title,metadata,created_at",
    ...(preview && { status: "any" }),
  }

  const moreObjectParams = {
    query: {
      type: "posts",
    },
    limit: 3,
    props: "title,slug,metadata,created_at",
    ...(preview && { status: "any" }),
  }

  const { objects } = await bucket.getObjects(singleObjectParams)
  const object = objects[0]

  const { objects: moreObjects } = await bucket.getObjects(moreObjectParams)
  const morePosts = moreObjects
    ?.filter(({ slug: object_slug }: { slug: string }) => object_slug !== slug)
    .slice(0, 2)

  return {
    post: object,
    morePosts,
  }
}
