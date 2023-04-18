import create from "assets/icons/create.svg"
import DarkModeSwitcher from "components/DarkModeSwitcher"
import Form from "components/Form"
import ModalWindow from "components/ModalWindow"
import { FC } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./Header.scss"
import { useHeaderLogic } from "./useHeaderLogic"

interface IRoutes {
  path: string
  name: string
}

interface IHeaderProps {
  routes: IRoutes[]
}

interface ILinks {
  routes: IRoutes[]
  pathname: string
}

const getLinks = ({ routes, pathname }: ILinks) =>
  routes.map(({ path, name }, key) => (
    <Link key={key} to={path} className={`nav-link ${pathname === path ? "active" : ""}`}>
      {name}
    </Link>
  ))

const Header: FC<IHeaderProps> = ({ routes }) => {
  const { pathname, isCreate, handleClose, handleShow, handleCreate } = useHeaderLogic()

  const links = getLinks({ routes, pathname })

  return (
    <>
      <Navbar expand="md" className="header">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="header__nav">
            <Nav className="mr-auto">{links}</Nav>

            <DarkModeSwitcher />

            <Button className="header__button" variant="light" onClick={handleShow}>
              <img src={create} alt="create" />
              <span>Create</span>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Use conditional rendering to avoid unnecessary re-renders */}
      {isCreate && (
        <ModalWindow isOpen={isCreate} onClose={handleClose} title="Create">
          <Form
            onClose={handleClose}
            submitLabel="OK"
            onSubmit={handleCreate}
            postData={{
              image: "",
              title: "",
              excerpt: "",
              content: "",
            }}
          />
        </ModalWindow>
      )}
    </>
  )
}

export default Header
