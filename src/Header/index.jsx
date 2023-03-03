import { Link } from 'react-router-dom';
import Container from '../Container';
import styles from './styles.module.scss';

const Header = () => {

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.body}>
            <nav>
              <ul className={styles.menu}>
                <li className={styles.menuItem}><Link className={styles.menuLink} to="/">Home</Link></li>
                <li className={styles.menuItem}><Link className={styles.menuLink} to="/blog">Blog</Link></li>
                <li className={styles.menuItem}><Link className={styles.menuLink} to="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </Container>
      </header>
      <div className={styles.placeholder} />
    </>
  );
}

export default Header;