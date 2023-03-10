import { Link } from "react-router-dom";
import './styles.scss';
import { useState } from "react";

const HeaderNav = ({ path, routes }) => {

  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        {routes.map((item, index) => (
          <li className="nav__item" key={index}>
            <Link
              className={`nav__link${item.path === path ? " active" : ""}`}
              to={item.path}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;