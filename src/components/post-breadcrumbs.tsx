import Link from "next/link"
import React from "react"

type PostHeaderProps = {
  title: string
  slug: string
}

const PostBreadcrumbs: React.FC<PostHeaderProps> = ({ title, slug }) => {
  return (
    <div className="mb-4 flex flex-row flex-wrap items-center gap-4 text-lg text-slate-500">
      <Link href="/">Blog</Link>
      <span className="select-none">/</span>
      <Link href={`/posts/${slug}`}>{title}</Link>
    </div>
  )
}

export default PostBreadcrumbs
