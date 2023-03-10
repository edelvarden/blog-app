import { Link } from "react-router-dom";
import Container from "../Container";
import "./styles.scss";

const Header = ({ path, routes }) => {

  return (
    <>
      <header className="header">
        <Container>
          <div className="header__content">
            <nav className="header__menu">
              <ul className="header__menu">
                {routes.map((item, index) => (
                  <li key={index}>
                    <Link
                      className={`header__menu__link${
                        item.path === path ? " active" : ""
                      }`}
                      to={item.path}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
