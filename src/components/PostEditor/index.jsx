import { useEffect, useState } from 'react';
import FormRichEdit from './../FormRichEdit';
import FormButton from '../FormButton';
import FormInput from './../FormInput';
import './styles.scss';

const PostEditor = ({ blogTitle = '', content = '', onSave, onCancel }) => {
  const [title, setTitle] = useState(blogTitle);
  const [body, setBody] = useState(content);

  useEffect(() => {
    setTitle(blogTitle);
    setBody(content);
  }, [blogTitle, content]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleBodyChange = (value) => setBody(value);

  const handleSubmit = () => {
    const data = { title, body };
    console.log(data);
    onSave(data);
  };

  return (
    <div>
      <FormInput labelText="Title" inputId="title" value={title} onChange={handleTitleChange} required />
      <FormRichEdit labelText="Content" value={body} onChange={handleBodyChange} />
      <div className='edit-form__buttons'>
        <FormButton text={'Save'} onClick={handleSubmit} />
        <FormButton text={'Cancel'} onClick={onCancel} />
      </div>
    </div>
  );
};

export default PostEditor;
