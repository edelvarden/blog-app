import Link from "next/link"

type PostHeaderProps = {
  title: string
  slug: string
}

const PostBreadcrumbs = (props: PostHeaderProps) => {
  const { title, slug } = props
  return (
    <div className="mb-4 flex flex-row flex-wrap items-center gap-4 text-lg text-slate-500">
      <Link href={"/"}>Blog</Link>
      <span className="select-none">{`/`}</span>
      <Link href={`/posts/${slug}`}>{title}</Link>
    </div>
  )
}

export default PostBreadcrumbs
