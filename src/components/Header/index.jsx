import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import styles from "./styles.module.scss";

const Header = ({ routes }) => {
  const [offset, setOffset] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () =>
      (headerRef.current?.getBoundingClientRect().top === 0);

    setOffset(headerRef.current?.offsetHeight || 0);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = Object.entries(routes);

  return (
    <>
      <header
        className={styles.header}
        ref={headerRef}
        style={{ position: "fixed", width: "100%", zIndex: 9999 }}
      >
        <Container>
          <div className={styles.body}>
            <nav>
              <ul className={styles.menu}>
                {menuItems.map(([path, name]) => (
                  <li key={path}>
                    <Link className={styles.menuLink} to={path}>
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
