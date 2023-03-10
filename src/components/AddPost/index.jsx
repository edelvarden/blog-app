import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { useCallback, lazy, Suspense, useState, memo } from 'react';
import 'react-quill/dist/quill.snow.css';
import Skeleton from '../Skeleton';
import './styles.scss';

hljs.registerLanguage('javascript', javascript);

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
  highlight: text => hljs.highlightAuto(text).value,
  theme: 'default',
};

const FormLabel = ({ text }) => (
  <label className='form__label'>{text}</label>
);

const FormInput = memo(({ id, value, onChange, required }) => (
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

const FormTextareaButtons = () => (
  <div className='form__textarea-buttons'></div>
);

const FormSubmitButton = ({ text }) => (
  <button className='form__submit' type='submit'>
    {text}
  </button>
);

const LazyReactQuill = lazy(() =>
  import(
    /* webpackChunkName: "quill" */ 'react-quill'
  )
);

const PostContent = memo(({ postContent, setPostContent }) => {
  return (
    <LazyReactQuill
      theme='snow'
      value={postContent}
      onChange={setPostContent}
      modules={{ toolbar: toolbarOptions, syntax: syntaxOptions }}
    />
  );
});

const AddPostForm = memo(
  ({ postTitle, setPostTitle, postContent, setPostContent, handleSubmit }) => {
    return (
      <form className='form' onSubmit={handleSubmit}>
        <FormLabel text='Title' />
        <FormInput
          id='postTitle'
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
          required
        />

        <FormLabel text='Content' />
        <PostContent postContent={postContent} setPostContent={setPostContent} />

        <FormTextareaButtons />
        <FormSubmitButton text='Publish' />
      </form>
    );
  }
);

const AddPost = ({ onClose, onSave }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const memoizedHandleSubmit = useCallback(
    event => {
      event.preventDefault();
      console.log(postContent);
    },
    [postContent]
  );

  return (
    <Suspense fallback={<div className='skeleton-wrapper'><Skeleton height={50} /><Skeleton height={250} /></div>}>
      <AddPostForm
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postContent={postContent}
        setPostContent={setPostContent}
        handleSubmit={memoizedHandleSubmit}
      />
    </Suspense>
  );
};

export default AddPost;
