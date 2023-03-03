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
                <li className={styles.menuItem}><a href="/">Home</a></li>
                <li className={styles.menuItem}><a href="/blog">Blog</a></li>
                <li className={styles.menuItem}><a href="/contact">Contact</a></li>
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