import { AuthorType, ImgixType } from "@/types"
import Avatar from "./avatar"
import CoverImage from "./cover-image"
import Date from "./date"
import PostTitle from "./post-title"
import PostBreadcrumbs from "./post-breadcrumbs"

type PostHeaderProps = {
  title: string
  coverImage: ImgixType
  date: string
  author: AuthorType
  slug: string
}

const PostHeader = (props: PostHeaderProps) => {
  const { title, coverImage, date, author, slug } = props
  return (
    <header>
      <PostBreadcrumbs title={title} slug={slug} />
      <div className="mb-4 text-lg">
        <span>Published </span>
        <Date dateString={date} />
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-8 md:block">
        <Avatar name={author.title} picture={author.metadata.picture.imgix_url} />
      </div>
      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={title} url={coverImage.imgix_url} slug={""} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          <Avatar name={author.title} picture={author.metadata.picture.imgix_url} />
        </div>
      </div>
    </header>
  )
}

export default PostHeader
