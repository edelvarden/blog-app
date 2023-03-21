import Form from 'components/Form';
import FormButton from "components/FormButton";
import FormInput from "components/FormInput";
import FormLabel from 'components/FormLabel';
import Skeleton from 'components/Skeleton';
import { lazy, Suspense, useState } from 'react';
import './styles.scss';

const FormRichEdit = lazy(() => import('../FormRichEdit'));

const AddPost = ({ onSave }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSubmit =
    (event) => {
      event.preventDefault();
      console.log(postContent);
      onSave();
    };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>Title</FormLabel>
      <FormInput inputId="postTitle" value={postTitle} onChange={setPostTitle} required />
      <Suspense fallback={<><Skeleton height={50} /><Skeleton height={250} /></>}>
        <FormLabel>Content</FormLabel>
        <FormRichEdit value={postContent} onChange={setPostContent} />
      </Suspense>
      <FormButton text='Publish' type={'submit'} />
    </Form>
  );
};

export default AddPost;
