import Container from "../Container";
import "./styles.scss";
import HeaderNav from "./../HeaderNav";

const Header = ({ path, routes }) => {
  return (
    <header className="header">
      <Container>
        <div className="header__body">
            <HeaderNav path={path} routes={routes} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
