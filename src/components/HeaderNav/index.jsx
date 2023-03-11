import { Link, useLocation } from "react-router-dom";
import './styles.scss';

const HeaderNav = ({ routes }) => {
  const { pathname: pathName } = useLocation();

  return (
    <nav className="nav">
      <ul className="nav__list">
        {routes.map(({ path, name, id }, key) => (
          <li className="nav__item" key={key}>
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
