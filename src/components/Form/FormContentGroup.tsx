import FormRichEdit from "components/FormRichEdit"
import { FC, useState } from "react"
import { Form } from "react-bootstrap"

interface IProps {
  postContent: string
}

const FormContentGroup: FC<IProps> = ({ postContent }) => {
  const [newPostContent, setNewPostContent] = useState<string>(postContent)

  return (
    <Form.Group controlId="postContent" className="form__group">
      <Form.Label>Content</Form.Label>
      <FormRichEdit
        className="form__group"
        value={newPostContent}
        onChange={(value: string) => setNewPostContent(value)}
        placeholder={"Share your thoughts about this topic"}
      />
      <Form.Control.Feedback type="invalid">Please make the content longer.</Form.Control.Feedback>
    </Form.Group>
  )
}

export default FormContentGroup
