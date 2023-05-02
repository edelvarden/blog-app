import { AuthorType, ImgixType } from "@/types"
import Link from "next/link"
import Avatar from "./avatar"
import CoverImage from "./cover-image"
import Date from "./date"

type PostPreviewProps = {
  title: string
  coverImage: ImgixType
  date: string
  excerpt: string
  author: AuthorType
  slug: string
}

const PostPreview = (props: PostPreviewProps) => {
  const { title, coverImage, date, excerpt, author, slug } = props

  return (
    <article className="overflow-hidden rounded-[18px] shadow-elevation-1 transition-shadow hover:shadow-elevation-2">
      <Link href={`/posts/${slug}`}>
        <header>
          <CoverImage
            slug={slug}
            title={title}
            url={coverImage.imgix_url}
            className="rounded-none"
          />
        </header>
        <div className="px-10 py-6">
          <h3 className="mb-3 text-3xl leading-snug line-clamp-4">{title}</h3>
          <div className="mb-4 text-lg">
            <Date dateString={date} />
          </div>
          <p className="mb-4 line-clamp-4">{excerpt}</p>
          <Avatar name={author.title} picture={author.metadata.picture.imgix_url} />
        </div>
      </Link>
    </article>
  )
}

export default PostPreview
