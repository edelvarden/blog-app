import FormRichEdit from 'components/FormRichEdit';
import { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

const ModalWindow = ({ isOpen, onClose, title, submitLabel, onSubmit, postImage = null, postTitle = '', postExcerpt = '', postContent = '' }) => {

  const [newPostTitle, setNewPostTitle] = useState(postTitle);
  const [newPostExcerpt, setNewPostExcerpt] = useState(postExcerpt);
  const [newPostContent, setNewPostContent] = useState(postContent);
  const [imagePreview, setImagePreview] = useState(postImage);

  const handleSubmit = () => {
    const postData = {
      title: newPostTitle,
      excerpt: newPostExcerpt,
      content: newPostContent,
    };
    onSubmit(postData);
  };


  return (
    <>
      <Modal show={isOpen} onHide={onClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group controlId="postImage">
              <Form.Label>Image</Form.Label>
              <Form.Control style={{ marginBottom: '1em' }} type='file' accept="image/*" onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))} required />
              {imagePreview && <div className='card-block__image' style={{marginBottom: '1em'}}><img style={{display: "block"}} src={imagePreview} alt="preview" /></div>}
            </Form.Group>

            <Form.Group controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control autocomplete="off" style={{ marginBottom: '1em' }} type='text' value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="postExcerpt">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control autocomplete="off" style={{ marginBottom: '1em' }} type='text' value={newPostExcerpt} onChange={(e) => setNewPostExcerpt(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="postContent">
              <Form.Label>Content</Form.Label>
              <FormRichEdit style={{ marginBottom: '1em' }} value={newPostContent} onChange={(value) => setNewPostContent(value)} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {submitLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default ModalWindow;