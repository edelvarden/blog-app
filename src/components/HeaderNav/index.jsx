import { Link } from "react-router-dom";
import './styles.scss';
import { useState } from "react";

const HeaderNav = ({ path, routes }) => {
  const pathName = path;
  return (
    <nav className="nav">
      <ul className="nav__list">
        {routes.map(({ path, name, id }, index) => (
          <li className="nav__item" key={index}>
            <Link
              className={`nav__link${pathName === path ? " active" : ""}`}
              to={path}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;
