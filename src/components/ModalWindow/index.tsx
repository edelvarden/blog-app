import FormRichEdit from "components/FormRichEdit"
import useWebpConversion from "hooks/useWebpConversion"
import { FC, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import "./styles.scss"

interface IModalWindowProps {
  isOpen: boolean
  onClose: () => void
  title: string
  submitLabel: string
  onSubmit: (postData: {}) => void
  postImage?: string
  postTitle?: string
  postExcerpt?: string
  postContent?: string
}

const ModalWindow: FC<IModalWindowProps> = ({
  isOpen,
  onClose,
  title,
  submitLabel,
  onSubmit,
  postImage = "",
  postTitle = "",
  postExcerpt = "",
  postContent = "",
}) => {
  const [newPostTitle, setNewPostTitle] = useState(postTitle)
  const [newPostExcerpt, setNewPostExcerpt] = useState(postExcerpt)
  const [newPostContent, setNewPostContent] = useState(postContent)
  const [imagePreview, setImagePreview] = useState(postImage)
  const [validated, setValidated] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      setValidated(true)

      if (newPostTitle.length > 10 && newPostContent.length > 30) {
        const postData = {
          image: imagePreview,
          title: newPostTitle,
          excerpt: newPostExcerpt,
          content: newPostContent,
        }

        onSubmit(postData)
      }
    }
  }

  const handleImageChange = async (e: any) => {
    const file: any = e.target.files[0]

    // Convert image to webp format
    const convertedFile = (await useWebpConversion(file)) as Blob
    setImagePreview(URL.createObjectURL(convertedFile))
  }

  return (
    <>
      <Modal show={isOpen} onHide={onClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="postImage" className="form__group">
              <Form.Label>Image</Form.Label>
              <div className="form__image-picker">
                {
                  <div className="form__image-preview">
                    <img
                      style={{ display: imagePreview ? "block" : "none" }}
                      src={imagePreview}
                      alt="preview"
                    />
                  </div>
                }
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              <Form.Control.Feedback type="invalid">
                Please upload an image preview.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postTitle" className="form__group">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoComplete="off"
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
                placeholder={"My loud article headline"}
                minLength={10}
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                Please make the title longer.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postExcerpt" className="form__group">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control
                autoComplete="off"
                type="text"
                value={newPostExcerpt}
                onChange={(e) => setNewPostExcerpt(e.target.value)}
                required
                placeholder={"My short description of the article"}
                minLength={10}
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                Please make the excerpt longer.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postContent" className="form__group">
              <Form.Label>Content</Form.Label>
              <FormRichEdit
                className="form__group"
                value={newPostContent}
                onChange={(value: string) => setNewPostContent(value)}
                placeholder={"Share your thoughts about this topic"}
              />
              <Form.Control.Feedback type="invalid">
                Please make the content longer.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={() => {
              onClose()
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {submitLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalWindow
