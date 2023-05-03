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
    <article className="relative overflow-hidden rounded-[18px] shadow-elevation-1 transition-shadow hover:shadow-elevation-2">
      <Link href={`/posts/${slug}`} className="absolute left-0 top-0 block h-full w-full" />
      <section>
        <CoverImage slug={slug} title={title} url={coverImage.imgix_url} className="rounded-none" />
      </section>
      <section className="px-10 py-6">
        <h3 className="mb-3 line-clamp-4 text-3xl leading-snug">{title}</h3>
        <div className="mb-4 text-lg">
          <Date dateString={date} />
        </div>
        <p className="mb-4 line-clamp-4">{excerpt}</p>
        <Avatar name={author.title} picture={author.metadata.picture.imgix_url} />
      </section>
    </article>
  )
}

export default PostPreview
