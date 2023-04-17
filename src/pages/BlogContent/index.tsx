import edit from "assets/icons/edit.svg"
import ModalWindow from "components/ModalWindow"
import useDateFormatter from "hooks/useDateFormatter"
import { FC, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import "./styles.scss"

interface IBlogContentProps {
  id: number
  title: string
  date: string
  excerpt: string
  content: string
  image: string
}

const BlogContent: FC<IBlogContentProps> = ({ id, title, date, excerpt, content, image }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [postImage, setPostImage] = useState(`/articles/${id}/${image}`)
  const [postTitle, setPostTitle] = useState(title)
  const [postExcerpt, setPostExcerpt] = useState(excerpt)
  const [postContent, setPostContent] = useState(content)
  const [isEditMode, setIsEditMode] = useState(false)
  const formattedDate = useDateFormatter(date)

  interface IPostData {
    title: string
    excerpt: string
    content: string
    image: string
  }

  const handlePostSave = (data: IPostData) => {
    if (data.title.length > 10 && data.excerpt.length > 10 && data.content.length > 30) {
      setPostImage(data.image)
      setPostTitle(data.title)
      setPostExcerpt(data.excerpt)
      setPostContent(data.content)
      setIsEditMode(false)
      // log -----------------
      console.log(data.title)
      console.log(data.content)
      // ---------------------
    }
  }

  const handleImageLoad = () => setIsImageLoaded(true)

  // Use useEffect hook to update the page title on each render
  useEffect(() => {
    document.title = `${postTitle}`
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [postTitle])

  const postData = {
    postImage,
    postTitle,
    postContent,
    postExcerpt,
  }

  return (
    <Container style={{ maxWidth: "728px" }}>
      <div className="d-flex justify-content-between align-items-center">
        {date && (
          <span className="blog-content__date">
            Published <time dateTime={date}>{formattedDate}</time>
          </span>
        )}
        <Button
          variant="light"
          onClick={() => setIsEditMode(!isEditMode)}
          className="blog-content__button"
        >
          <img src={edit} alt="edit" />
          <span>Edit</span>
        </Button>
      </div>

      <ModalWindow
        isOpen={isEditMode}
        onClose={() => setIsEditMode(false)}
        title="Edit article"
        submitLabel="Save"
        postImage={postData.postImage}
        postTitle={postData.postTitle}
        postContent={postData.postContent}
        postExcerpt={postData.postExcerpt}
        onSubmit={handlePostSave}
      />

      <section className="blog-content__section">
        <Row className="justify-content-center">
          <Col>
            <h1 className="blog-content__title">{postData.postTitle}</h1>
            <div className="blog-content__image">
              <img
                className={` ${isImageLoaded ? "loaded" : ""}`}
                src={postData.postImage}
                alt={postData.postTitle}
                onLoad={handleImageLoad}
              />
            </div>
            <div
              className="blog-content__content"
              dangerouslySetInnerHTML={{ __html: postData.postContent }}
            />
          </Col>
        </Row>
      </section>
    </Container>
  )
}

export default BlogContent
