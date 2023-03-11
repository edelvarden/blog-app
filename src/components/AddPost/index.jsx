
import { lazy, Suspense, useCallback, useState } from 'react';
import Form from '../Form';
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import Skeleton from '../Skeleton';
import './styles.scss';

const FormRichEdit = lazy(() => import('../FormRichEdit'));

const AddPost = ({ onClose, onSave }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(postContent);
      onSave();
    },
    [postContent, onSave],
  );

  return (
    <Suspense fallback={<><Skeleton height={50} /><Skeleton height={250} /></>}>
      <Form onSubmit={handleSubmit}>
        <FormInput labelText="Title" inputId="postTitle" value={postTitle} onChange={setPostTitle} required />
        <FormRichEdit labelText="Content" value={postContent} onChange={setPostContent} />
        <FormButton text='Publish' type={'submit'} />
      </Form>
    </Suspense>
  );
};

export default AddPost;
