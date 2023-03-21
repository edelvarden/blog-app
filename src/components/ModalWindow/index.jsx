import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import FormRichEdit from 'components/FormRichEdit';
import { useState } from 'react';

const ModalWindow = ({ isOpen, onClose, title, submitLabel, onSubmit, postTitle, postExcerpt, postContent }) => {

  const [statePostTitle, setPostTitle] = useState(postTitle ? postTitle : '');
  const [statePostExcerpt, setPostExcerpt] = useState(postExcerpt ? postExcerpt : '');
  const [statePostContent, setPostContent] = useState(postContent ? postContent : '');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>

          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input id="postTitle" type='text' value={statePostTitle} onChange={(e) => setPostTitle(e.target.value)} required />
            <FormLabel>Excerpt</FormLabel>
            <Input id="postExcerpt" type='text' value={statePostExcerpt} onChange={(e) => setPostExcerpt(e.target.value)} required />
            <FormLabel>Content</FormLabel>
            <FormRichEdit value={statePostContent} onChange={(value) => setPostContent(value)} />
          </FormControl>

        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSubmit}>
            {submitLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default ModalWindow;
