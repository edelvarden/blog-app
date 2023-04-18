import { FC, useState } from "react"
import { Button, Form } from "react-bootstrap"
import "./Form.scss"
import FormContentGroup from "./FormContentGroup"
import FormExcerptGroup from "./FormExcerptGroup"
import FormImageGroup from "./FormImageGroup"
import FormTitleGroup from "./FormTitleGroup"

interface IFormData {
  image: string
  title: string
  excerpt: string
  content: string
}

interface IFormProps {
  submitLabel: string
  onSubmit: (data: IFormData) => void
  onClose: () => void
  postImage?: string
  postTitle?: string
  postExcerpt?: string
  postContent?: string
}

const FormComponent: FC<IFormProps> = ({
  submitLabel,
  onSubmit,
  onClose,
  postImage = "",
  postTitle = "",
  postExcerpt = "",
  postContent = "",
}) => {
  const newPostTitle = postTitle
  const newPostExcerpt = postExcerpt
  const newPostContent = postContent
  const imagePreview = postImage
  const [validated, setValidated] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      setValidated(true)

      const postData = {
        image: imagePreview,
        title: newPostTitle,
        excerpt: newPostExcerpt,
        content: newPostContent,
      }

      onSubmit(postData)
    }
  }

  const handleClose = () => onClose()

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <FormImageGroup postImage={imagePreview} />
      <FormTitleGroup postTitle={newPostTitle} />
      <FormExcerptGroup postExcerpt={newPostExcerpt} />
      <FormContentGroup postContent={newPostContent} />

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
