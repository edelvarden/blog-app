import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Menu, MenuButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Container from "components/Container";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArticleForm from "components/ArticleForm";

const Header = ({ routes }) => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

  return (
    <Box as="header">
      <Container>
        <Box >
          <Menu isOpen={isMenuOpen}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} onMouseOver={handleMenuOpen}>
              Menu
            </MenuButton>
            {routes.map(({ path, name, id }, key) => (
              <Link key={key} {...{ to: path }}>
                {name}
              </Link>

            ))}
            <Button onClick={onOpen}>Create</Button>
            <ArticleForm isOpen={isOpen} onClose={onClose} title={'Create new article'} submitLabel={'Create'}/>
              
          </Menu>
        </Box>
      </Container>
    </Box>


  );
};

export default Header;
