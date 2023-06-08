import React, { ReactNode } from "react"

type PostTitleProps = {
  children: ReactNode
}

const PostTitle: React.FC<PostTitleProps> = ({ children }) => {
  return <h1 className="text-left">{children}</h1>
}

export default PostTitle
