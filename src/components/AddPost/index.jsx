import { useState } from 'react';
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
      <label className="form__label">Title</label>
      <input
        className="form__input"
        type="text"
        id="postTitle"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        required
      />
      <label className="form__label">Content</label>
      <ReactQuill
        theme={'snow'}
        value={postContent}
        onChange={setPostContent}
        modules={{ toolbar: toolbarOptions, syntax: syntaxOptions }}
      />
      <div className="form__textarea-buttons"></div>
      <button className="form__submit" type="submit">
        Publish
      </button>
    </form>
  );
};

export default AddPost;
