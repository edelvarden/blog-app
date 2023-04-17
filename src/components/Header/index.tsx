import create from "assets/icons/create.svg"
import DarkModeSwitcher from "components/DarkModeSwitcher"
import ModalWindow from "components/ModalWindow"
import { FC, useMemo, useState } from "react"
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import "./styles.scss"

interface IRoutes {
  path: string
  name: string
}

interface IHeaderProps {
  routes: IRoutes[]
}

const Header: FC<IHeaderProps> = ({ routes }) => {
  const { pathname } = useLocation()
  const [isCreate, setIsCreate] = useState(false)

  const handleClose = () => setIsCreate(false)
  const handleShow = () => setIsCreate(true)

  interface FormData {
    title: string
    excerpt: string
    content: string
  }

  const handleCreate = (data: FormData) => {
    if (data.title.length > 10 && data.excerpt.length > 10 && data.content.length > 30) {
      setIsCreate(false)
      // log -----------------
      console.log(data.title)
      console.log(data.content)
      // ---------------------
    }
  }
  const getLinks = () =>
    routes.map(({ path, name }, key) => (
      <Link key={key} to={path} className={`nav-link ${pathname === path ? "active" : ""}`}>
        {name}
      </Link>
    ))

  const links = useMemo(getLinks, [routes, pathname])

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
        <ModalWindow
          isOpen={isCreate}
          onClose={handleClose}
          title={"Create"}
          submitLabel={"OK"}
          onSubmit={handleCreate}
        />
      )}
    </>
  )
}

export default Header
