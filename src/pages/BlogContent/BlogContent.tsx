import edit from "assets/icons/edit.svg"
import Form from "components/Form"
import ModalWindow from "components/ModalWindow"
import { useDateFormatter } from "hooks/useDateFormatter"
import { FC, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import "./BlogContent.scss"

interface IBlogContentProps {
  id: number
  title: string
  date: string
  excerpt: string
  content: string
  image: string
}

interface IPostData {
  title: string
  excerpt: string
  content: string
  image: string
}

const BlogContent: FC<IBlogContentProps> = ({ id, title, date, excerpt, content, image }) => {
  const [postData, setPostData] = useState<IPostData>({
    image: `/articles/${id}/${image}`,
    title: title,
    excerpt: excerpt,
    content: content,
  })
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const formattedDate = useDateFormatter(date)

  const handlePostSave = (data: IPostData) => {
    if (data.title.length > 10 && data.excerpt.length > 10 && data.content.length > 30) {
      setPostData({
        image: data.image,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
      })
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
    document.title = `${postData.title}`
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [postData])

  const handleClose = () => setIsEditMode(false)

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

      <ModalWindow isOpen={isEditMode} onClose={handleClose} title="Edit article">
        <Form
          submitLabel="Save"
          postData={postData}
          onSubmit={handlePostSave}
          onClose={handleClose}
        />
      </ModalWindow>

      <section className="blog-content__section">
        <Row className="justify-content-center">
          <Col>
            <h1 className="blog-content__title">{postData.title}</h1>
            <div className="blog-content__image">
              <img
                className={` ${isImageLoaded ? "loaded" : ""}`}
                src={postData.image}
                alt={postData.title}
                onLoad={handleImageLoad}
              />
            </div>
            <div
              className="blog-content__content"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </Col>
        </Row>
      </section>
    </Container>
  )
}

export default BlogContent
