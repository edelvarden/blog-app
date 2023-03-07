import { useState, lazy, Suspense } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.scss';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
hljs.registerLanguage('javascript', javascript);
hljs.highlightAll();

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
  highlight: (text) => hljs.highlightAuto(text).value,
  theme: 'default',
};

const FormLabel = ({ text }) => (
  <label className="form__label">{text}</label>
);

const FormInput = ({ id, value, onChange, required }) => (
  <input
    className="form__input"
    type="text"
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    autoComplete="off"
  />
);

const FormTextareaButtons = () => (
  <div className="form__textarea-buttons"></div>
);

const FormSubmitButton = ({ text }) => (
  <button className="form__submit" type="submit">
    {text}
  </button>
);

// Use React.lazy to lazily import the component
const LazyReactQuill = lazy(() => import('react-quill'));

const AddPost = ({ onClose, onSave }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // onSave({ title: postTitle, content: postContent });
    console.log(postContent);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Wrap the component with React.Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <FormLabel text="Title" />
        <FormInput
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />

        <FormLabel text="Content" />
        {/* Replace the component with the lazy component */}
        <LazyReactQuill
          theme={'snow'}
          value={postContent}
          onChange={setPostContent}
          modules={{ toolbar: toolbarOptions, syntax: syntaxOptions }}
        />
        <FormTextareaButtons />
        <FormSubmitButton text="Publish" />
      </Suspense>
    </form>
  );
};

export default AddPost;
