import { useEffect, useMemo, useRef, useState, useCallback, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "../Container";
import "./styles.scss";

const Header = ({ routes }) => {
  const [offset, setOffset] = useState(0);
  const headerRef = useRef(null);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    if (!headerRef.current) return;
    const { top } = headerRef.current.getBoundingClientRect();
    return top === 0;
  }, [headerRef]);

  useLayoutEffect(() => {
    setOffset(headerRef.current?.offsetHeight || 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const menuItems = useMemo(() => Object.entries(routes), [routes]);

  return (
    <>
      <header
        className="header"
        ref={headerRef}
        style={{ position: "fixed", width: "100%", zIndex: 9999 }}
      >
        <Container>
          <div className="header__content">
            <nav className="header__menu">
              <ul
                className={`header__menu`}
              >
                {menuItems.map(([path, name]) => (
                  <li key={path}>
                    <Link className={`header__menu__link${path === location.pathname ? " active" : ""}`} to={path}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </header>
      <div style={{ paddingTop: `${offset}px` }} />
    </>
  );
};

export default Header;
