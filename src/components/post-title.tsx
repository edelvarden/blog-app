import { ReactNode } from "react"

type PostTitleProps = {
  children: ReactNode
}

const PostTitle = (props: PostTitleProps) => {
  const { children } = props
  return (
    <h1 className="text-left text-6xl font-bold leading-tight tracking-tighter md:leading-none">
      {children}
    </h1>
  )
}
export default PostTitle
