import FormRichEdit from 'components/FormRichEdit';
import { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

const ModalWindow = ({ isOpen, onClose, title, submitLabel, onSubmit, postTitle = '', postExcerpt  = '', postContent = '' }) => {

  const [statePostTitle, setPostTitle] = useState(postTitle);
  const [statePostExcerpt, setPostExcerpt] = useState(postExcerpt);
  const [statePostContent, setPostContent] = useState(postContent);

  return (
    <>
      <Modal show={isOpen} onHide={onClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' value={statePostTitle} onChange={(e) => setPostTitle(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="postExcerpt">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control type='text' value={statePostExcerpt} onChange={(e) => setPostExcerpt(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="postContent">
              <Form.Label>Content</Form.Label>
              <FormRichEdit value={statePostContent} onChange={(value) => setPostContent(value)} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            {submitLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default ModalWindow;
