import Container from "components/Container";
import HeaderNav from "components/HeaderNav";
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
