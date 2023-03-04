import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss";

const Home = ({ articles }) => {
  const [visibleArticles, setVisibleArticles] = useState(5);
  const [loadedArticles, setLoadedArticles] = useState(0);
  const lazyLoaderRef = useRef(null);

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && visibleArticles < articles.length) {
          setVisibleArticles(prev => prev + 10);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });

    if (lazyLoaderRef.current) {
      observer.observe(lazyLoaderRef.current);
    }

    return () => {
      observer.disconnect();
    }
  }, [articles.length, visibleArticles]);


  return (
    <>
      <h1>Home</h1>
      {/* <AddPost /> */}

      <ul className={styles.list}>
        {articles.slice(loadedArticles, visibleArticles).map(({ id, image, title, excerpt }) => (
          <li key={id} className={styles.item}>
            <Link className={styles.link} to={`/article/${id}`}>
              <div className={styles.image}>
                <img src={`/articles/1/${image}`} alt="image" />
              </div>
              <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.paragraph}>{excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {visibleArticles >= articles.length && (
        <div style={{ textAlign: "center", color: "gray" }}>No more articles to load.</div>
      )}

      <div ref={lazyLoaderRef}></div>
    </>
  );
};

export default Home;
