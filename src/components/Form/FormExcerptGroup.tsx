import { FC, useState } from "react"
import { Form } from "react-bootstrap"

interface IProps {
  postExcerpt: string
}

const FormExcerptGroup: FC<IProps> = ({ postExcerpt }) => {
  const [newPostExcerpt, setNewPostExcerpt] = useState<string>(postExcerpt)

  const handleExcerptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPostExcerpt(e.target.value)
  }

  return (
    <Form.Group controlId="postExcerpt" className="form__group">
      <Form.Label>Excerpt</Form.Label>
      <Form.Control
        autoComplete="off"
        type="text"
        value={newPostExcerpt}
        onChange={handleExcerptChange}
        required
        placeholder={"My short description of the article"}
        minLength={10}
        maxLength={100}
      />
      <Form.Control.Feedback type="invalid">Please make the excerpt longer.</Form.Control.Feedback>
    </Form.Group>
  )
}

export default FormExcerptGroup
