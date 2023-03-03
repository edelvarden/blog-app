import Container from "../Container";
import styles from "./styles.module.scss";
const Footer = () => {
  return (
    <footer>
      <Container>
        <div className={styles.body}>
          <p>&copy; 2023 My Blog. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;