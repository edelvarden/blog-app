import Container from "components/Container";
import ModalWindow from "components/ModalWindow";
import { useState } from "react";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = ({ routes }) => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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


          <Button variant="primary" onClick={handleShow}>
            Create
          </Button>
          <ModalWindow
            isOpen={show}
            onClose={handleClose}
            title={"Create"}
            submitLabel={"OK"}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
