import Container from "../Container";
import HeaderNav from "./../HeaderNav";
import "./styles.scss";

const Header = ({ path, routes }) => {
  return (
    <header className="header">
      <Container>
        <div className="header__body">
          <HeaderNav {...{ path, routes }} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
