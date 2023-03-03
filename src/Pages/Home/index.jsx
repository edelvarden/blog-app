import { Link } from 'react-router-dom';
import AddPost from '../../AddPost';
import styles from "./styles.module.scss";

const Home = ({ articles }) => {
  return (
    <>
      <h1>Home</h1>
      <AddPost />

      {/* Map over articles and display them */}
      <ul className={styles.list}>
        {articles?.map((article) => (
          <li className={styles.item} key={article.id}>
            <Link className={styles.link} to={`/article/${article.id}`}>
              <img src={"/articles/1/" + article.image} alt="image" />
              <div className={styles.content}>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.paragraph}>{article.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;