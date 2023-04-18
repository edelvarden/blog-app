import { FC, ReactNode } from "react"
import { Modal } from "react-bootstrap"
import "./ModalWindow.scss"

interface IModalWindowProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const ModalWindow: FC<IModalWindowProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      <Modal show={isOpen} onHide={onClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  )
}

export default ModalWindow
