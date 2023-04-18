import FormRichEdit from "components/FormRichEdit"
import { FC, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { webpConversion } from "services/webpConversion"
import "./Form.scss"

interface IPostData {
  title: string
  excerpt: string
  content: string
  image: string
}

interface IFormProps {
  submitLabel: string
  onSubmit: (data: IPostData) => void
  onClose: () => void
  postData: IPostData
}

const FormComponent: FC<IFormProps> = ({ submitLabel, onSubmit, onClose, postData }) => {
  const [newPostData, setNewPostData] = useState<IPostData>({
    image: postData.image,
    title: postData.title,
    excerpt: postData.excerpt,
    content: postData.content,
  })
  const [validated, setValidated] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
    }

    setValidated(true)

    onSubmit(newPostData)
  }

  const handleClose = () => onClose()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setNewPostData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Convert image to webp format
    const convertedFile: Blob | MediaSource = await webpConversion(file)

    setNewPostData((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(convertedFile),
    }))
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {/* form image select */}
      <Form.Group controlId="postImage" className="form__group">
        <Form.Label>Image</Form.Label>
        <div className="form__image-picker">
          {
            <div className="form__image-preview">
              <img
                style={{ display: postData.image ? "block" : "none" }}
                src={postData.image}
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

      {/* form title input */}
      <Form.Group controlId="postTitle" className="form__group">
        <Form.Label>Title</Form.Label>
        <Form.Control
          autoComplete="off"
          type="text"
          value={newPostData.title}
          onChange={(e) => handleChange(e, "title")}
          required
          placeholder={"My loud article headline"}
          minLength={10}
          maxLength={100}
        />
        <Form.Control.Feedback type="invalid">Please make the title longer.</Form.Control.Feedback>
      </Form.Group>

      {/* form excerpt input */}
      <Form.Group controlId="postExcerpt" className="form__group">
        <Form.Label>Excerpt</Form.Label>
        <Form.Control
          autoComplete="off"
          type="text"
          value={newPostData.excerpt}
          onChange={(e) => handleChange(e, "excerpt")}
          required
          placeholder={"My short description of the article"}
          minLength={10}
          maxLength={100}
        />
        <Form.Control.Feedback type="invalid">
          Please make the excerpt longer.
        </Form.Control.Feedback>
      </Form.Group>

      {/* form content input textarea (QUIL) */}
      <Form.Group controlId="postContent" className="form__group">
        <Form.Label>Content</Form.Label>
        <FormRichEdit
          className="form__group"
          value={newPostData.content}
          onChange={(value: string) =>
            setNewPostData((prevState) => ({
              ...prevState,
              content: value,
            }))
          }
          placeholder={"Share your thoughts about this topic"}
        />
        <Form.Control.Feedback type="invalid">
          Please make the content longer.
        </Form.Control.Feedback>
      </Form.Group>

      {/* form footer  */}
      <Form.Group className="form__footer">
        <Button variant="light" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          <>{submitLabel}</>
        </Button>
      </Form.Group>
    </Form>
  )
}

export default FormComponent
