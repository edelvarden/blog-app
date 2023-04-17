import { FC, memo } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./FormRichEdit.scss"

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

interface IFormRichEditProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className: string
}

const FormRichEdit: FC<IFormRichEditProps> = ({ value, onChange, placeholder, className }) => {
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
        className={className}
      />
    </>
  )
}

export default memo(FormRichEdit)
