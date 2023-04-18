import { FC, useState } from "react"
import { Form } from "react-bootstrap"

interface IProps {
  postTitle: string
}

const FormTitleGroup: FC<IProps> = ({ postTitle }) => {
  const [newPostTitle, setNewPostTitle] = useState<string>(postTitle)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPostTitle(e.target.value)
  }

  return (
    <Form.Group controlId="postTitle" className="form__group">
      <Form.Label>Title</Form.Label>
      <Form.Control
        autoComplete="off"
        type="text"
        value={newPostTitle}
        onChange={handleTitleChange}
        required
        placeholder={"My loud article headline"}
        minLength={10}
        maxLength={100}
      />
      <Form.Control.Feedback type="invalid">Please make the title longer.</Form.Control.Feedback>
    </Form.Group>
  )
}

export default FormTitleGroup
