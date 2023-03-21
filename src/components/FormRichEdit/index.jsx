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

const PostContent = ({ postContent, setPostContent }) => (
    <ReactQuill
        theme='snow'
        value={postContent}
        onChange={setPostContent}
        modules={{ toolbar: toolbarOptions }}
    />
);

const FormRichEdit = ({ value, onChange }) => (
    <>
        <PostContent postContent={value} setPostContent={onChange} />
    </>
);

export default FormRichEdit;