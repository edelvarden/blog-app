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
    { 'code-block': 'code' },
];

const PostContent = ({ postContent, setPostContent, placeholder }) => (
    <ReactQuill
        theme='snow'
        value={postContent}
        onChange={setPostContent}
        modules={{ toolbar: toolbarOptions }}
        placeholder={placeholder}
        required
    />
);

const FormRichEdit = ({ value, onChange, placeholder }) => (
    <>
        <PostContent postContent={value} setPostContent={onChange} placeholder={placeholder} />
    </>
);

export default FormRichEdit;