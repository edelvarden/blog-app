import styles from "./styles.module.scss"

type PostBodyProps = {
  content: string
}

const PostBody = (props: PostBodyProps) => {
  const { content } = props
  return (
    <div className="mx-auto max-w-2xl">
      <div className={styles["article-wrapper"]} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default PostBody
