import create from 'assets/create.svg';
import ModalWindow from "components/ModalWindow";
import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./styles.scss";
import DarkMode from 'components/DarkMode';

const Header = ({ routes }) => {
  const { pathname } = useLocation();

  const [isCreate, setIsCreate] = useState(false);

  const handleClose = () => setIsCreate(false);
  const handleShow = () => setIsCreate(true);

  return (
    <>
    
    <Navbar expand="md" className="header">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="header__nav">
          <Nav className="mr-auto">
            {routes.map(({ path, name, id }, key) => (
              <Link
                key={key}
                to={path}
                className={`nav-link ${pathname === path ? "active" : ""}`}
              >
                {name}
              </Link>
            ))}
          </Nav>

          <DarkMode/>

          <Button
            variant="light"
            onClick={handleShow}
          >
            <img src={create} alt="create" />
            <span>Create</span>
          </Button>


        </Navbar.Collapse>
      </Container>
    </Navbar>
    <ModalWindow
    isOpen={isCreate}
    onClose={handleClose}
    title={"Create"}
    submitLabel={"OK"}
  />
    </>
  );
};

export default Header;
