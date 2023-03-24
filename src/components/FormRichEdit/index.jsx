import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.scss';

const toolbarOptions = [
    { header: '2' },
    { bold: true },
    { italic: true },
    { underline: true },
    { strike: true },
    { list: 'ordered' },
    { list: 'bullet' },
    { link: true },
    { 'code-block': true }
];

const FormRichEdit = ({ value, onChange, placeholder, ...props }) => (
    <ReactQuill
        theme='snow'
        value={value}
        onChange={onChange}
        modules={{
            toolbar: toolbarOptions,
        }}
        placeholder={placeholder}
        required
        {...props}
    />
);

export default FormRichEdit;