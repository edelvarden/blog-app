import FormRichEdit from "components/FormRichEdit"
import { useState, memo } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import "./styles.scss"

const ModalWindow = memo(
  ({
    isOpen,
    onClose,
    title,
    submitLabel,
    onSubmit,
    postImage = null,
    postTitle = "",
    postExcerpt = "",
    postContent = "",
  }) => {
    const [newPostTitle, setNewPostTitle] = useState(postTitle)
    const [newPostExcerpt, setNewPostExcerpt] = useState(postExcerpt)
    const [newPostContent, setNewPostContent] = useState(postContent)
    const [imagePreview, setImagePreview] = useState(postImage)
    const [validated, setValidated] = useState(false)

    const handleSubmit = e => {
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

    // Use async/await to improve performance
    const handleImageChange = async e => {
      const file = e.target.files[0]

      // Convert image to webp format
      const convertedFile = await convertImageToWebP(file)
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
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
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
                  onChange={e => setNewPostTitle(e.target.value)}
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
                  onChange={e => setNewPostExcerpt(e.target.value)}
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
                  onChange={value => setNewPostContent(value)}
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
)

// convert image to webp format
const convertImageToWebP = async file => {
  const bitmap = await createImageBitmap(file)
  const canvas = document.createElement("canvas")

  canvas.width = bitmap.width
  canvas.height = bitmap.height
  canvas.getContext("2d").drawImage(bitmap, 0, 0)

  return await new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        const convertedFile = new File(
          [blob],
          `${file.name.split(".").shift()}.webp`,
          { type: "image/webp" }
        )
        resolve(convertedFile)
      },
      "image/webp",
      1
    )
  })
}

export default ModalWindow
