import hljs from 'highlight.js/lib/core';
import { useCallback, lazy, Suspense, useState, memo } from 'react';
import 'react-quill/dist/quill.snow.css';
import Skeleton from '../Skeleton';
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
  // { 'code-block': 'code' },
];

const syntaxOptions = {
  highlight: (text) => hljs.highlightAuto(text).value,
  theme: 'default',
};

const LazyReactQuill = lazy(() => import(/* webpackChunkName: "quill" */ 'react-quill'));

const FormLabel = ({ text }) => <label className='form__label'>{text}</label>;

const Input = memo(({ id, value, onChange, required }) => (
  <input
    className='form__input'
    type='text'
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    autoComplete='off'
  />
));

const TextareaButtons = memo(() => <div className='form__textarea-buttons'></div>);

const SubmitButton = memo(({ text }) => (
  <button className='form__submit' type='submit'>
    {text}
  </button>
));

const PostContent = memo(({ postContent, setPostContent }) => (
  <LazyReactQuill
    theme='snow'
    value={postContent}
    onChange={setPostContent}
    modules={{ toolbar: toolbarOptions, syntax: syntaxOptions }}
  />
));

const Form = memo(({ onSubmit, children }) => (
  <form className='form' onSubmit={onSubmit}>
    {children}
  </form>
));

const InputField = memo(({ labelText, inputId, value, onChange, required }) => (
  <>
    <FormLabel text={labelText} />
    <Input
      id={inputId}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  </>
));

const TextareaField = memo(({ labelText, value, onChange }) => (
  <>
    <FormLabel text={labelText} />
    <PostContent postContent={value} setPostContent={onChange} />
  </>
));

const AddPost = ({ onClose, onSave }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(postContent);
      onSave();
    },
    [postContent, onSave]
  );

  return (
    <Suspense fallback={<Skeleton height={300} />}>
      <Form onSubmit={handleSubmit}>
        <InputField labelText="Title" inputId="postTitle" value={postTitle} onChange={setPostTitle} required />
        <TextareaField labelText="Content" value={postContent} onChange={setPostContent} />
        <TextareaButtons />
        <SubmitButton text='Publish' />
      </Form>
    </Suspense>
  );
};

export default AddPost;