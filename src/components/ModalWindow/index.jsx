import FormRichEdit from 'components/FormRichEdit';
import { useMemo, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

const ModalWindow = ({ isOpen, onClose, title, submitLabel, onSubmit, postImage = null, postTitle = '', postExcerpt = '', postContent = '' }) => {
  const [newPostTitle, setNewPostTitle] = useState(postTitle);
  const [newPostExcerpt, setNewPostExcerpt] = useState(postExcerpt);
  const [newPostContent, setNewPostContent] = useState(postContent);
  const [imagePreview, setImagePreview] = useState(postImage);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (validated && newPostTitle.length > 10 && newPostContent.length > 30) {
      const postData = {
        image: imagePreview,
        title: newPostTitle,
        excerpt: newPostExcerpt,
        content: newPostContent,
      };

      onSubmit(postData);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Convert image to webp format
    convertImageToWebP(file).then(convertedFile => {
      setImagePreview(URL.createObjectURL(convertedFile));
    });
  }

  const richEdit = useMemo(() => <FormRichEdit style={{ marginBottom: '1em' }} value={newPostContent} onChange={(value) => setNewPostContent(value)} placeholder={'Share your thoughts about this topic'} />);

  return (
    <>
      <Modal show={isOpen} onHide={onClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="postImage" style={{ marginBottom: '1em' }}>
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' accept="image/*" onChange={handleImageChange} />
              {imagePreview && <div className='card-block__image' style={{ marginBottom: '1em', border: '1px solid #ced4da', borderRadius: '10px', overflow: 'hidden' }}><img style={{ display: "block" }} src={imagePreview} alt="preview" /></div>}
              <Form.Control.Feedback type="invalid">
                Please upload an image preview.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postTitle" style={{ marginBottom: '1em' }}>
              <Form.Label>Title</Form.Label>
              <Form.Control autoComplete="off" type='text' value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} required placeholder={'My loud article headline'} minLength={10} maxLength={100} />
              <Form.Control.Feedback type="invalid">
                Please make the title longer.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postExcerpt" style={{ marginBottom: '1em' }}>
              <Form.Label>Excerpt</Form.Label>
              <Form.Control autoComplete="off" type='text' value={newPostExcerpt} onChange={(e) => setNewPostExcerpt(e.target.value)} required placeholder={'My short description of the article'} minLength={10} maxLength={100} />
              <Form.Control.Feedback type="invalid">
                Please make the excerpt longer.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postContent" style={{ marginBottom: '1em' }}>
              <Form.Label>Content</Form.Label>
              {richEdit}
              <Form.Control.Feedback type="invalid">
                Please make the content longer.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit} disabled={!(newPostTitle.length > 10 && newPostContent.length > 30)}>
            {submitLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const convertImageToWebP = async (file) => {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext('2d').drawImage(bitmap, 0, 0);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      const convertedFile = new File([blob], `${file.name.split('.').shift()}.webp`, { type: 'image/webp' });
      resolve(convertedFile);
    }, 'image/webp', 1);
  });
}

export default ModalWindow;