import { lazy, Suspense, useCallback, useState } from 'react';
import Form from 'components/Form';
import FormButton from "components/FormButton";
import FormInput from "components/FormInput";
import Skeleton from 'components/Skeleton';
import './styles.scss';

const FormRichEdit = lazy(() => import('../FormRichEdit'));

const AddPost = ({ onSave }) => {
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
    <Form onSubmit={handleSubmit}>
      <FormInput labelText="Title" inputId="postTitle" value={postTitle} onChange={setPostTitle} required />
      <Suspense fallback={<><Skeleton height={50} /><Skeleton height={250} /></>}>
        <FormRichEdit labelText="Content" value={postContent} onChange={setPostContent} />
      </Suspense>
      <FormButton text='Publish' type={'submit'} />
    </Form>
  );
};

export default AddPost;
