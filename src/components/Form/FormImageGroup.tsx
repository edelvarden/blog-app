import useWebpConversion from "hooks/useWebpConversion"
import { FC, useState } from "react"
import { Form } from "react-bootstrap"

interface IProps {
  postImage: string
}

const FormImageGroup: FC<IProps> = ({ postImage }) => {
  const [imagePreview, setImagePreview] = useState<string>(postImage)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Convert image to webp format
    const convertedFile: Blob | MediaSource = await useWebpConversion(file)
    setImagePreview(URL.createObjectURL(convertedFile))
  }

  return (
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
      <Form.Control.Feedback type="invalid">Please upload an image preview.</Form.Control.Feedback>
    </Form.Group>
  )
}

export default FormImageGroup
