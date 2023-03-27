import { memo } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./styles.scss"

const toolbarOptions = [
  { header: "2" },
  { bold: true },
  { italic: true },
  { underline: true },
  { strike: true },
  { list: "ordered" },
  { list: "bullet" },
  { link: true },
  // { "code-block": true },
]

const FormRichEdit = memo(({ value, onChange, placeholder, ...props }) => {
  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{
          // syntax: true,
          toolbar: toolbarOptions,
        }}
        placeholder={placeholder}
        required
        {...props}
      />
    </>
  )
})

export default FormRichEdit
