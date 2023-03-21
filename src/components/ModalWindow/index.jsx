import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

const ModalWindow = ({ isOpen, onClose, title, submitLabel, onSubmit, children}) => (
  <Modal isOpen={isOpen} onClose={onClose} size='xl'>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>{children}</ModalBody>

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
);

export default ModalWindow;
