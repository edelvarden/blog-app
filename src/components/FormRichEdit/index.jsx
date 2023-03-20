import hljs from './../../hljs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormLabel from '../FormLabel';
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

const syntaxOptions = {
    highlight: (text) => hljs.highlightAuto(text).value
};

const PostContent = ({ postContent, setPostContent }) => (
    <ReactQuill
        theme='snow'
        value={postContent}
        onChange={setPostContent}
        modules={{ toolbar: toolbarOptions, syntax: syntaxOptions }}
    />
);

const FormRichEdit = ({ labelText, value, onChange }) => (
    <>
        <FormLabel text={labelText} />
        <PostContent postContent={value} setPostContent={onChange} />
    </>
);

export default FormRichEdit;