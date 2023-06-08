import React from "react"
import styles from "./styles.module.scss"

type PostBodyProps = {
  content: string
}

const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className={styles.articleWrapper} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default PostBody
