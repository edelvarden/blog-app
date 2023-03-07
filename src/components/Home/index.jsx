import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../ArticleCard";
import styles from "./styles.module.scss";

const Home = ({ articles }) => {
  const [visibleArticles, setVisibleArticles] = useState(5);
  const [loadedArticles, setLoadedArticles] = useState(0);
  const lazyLoaderRef = useRef(null);

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && visibleArticles < articles?.length) {
          setVisibleArticles((prev) => prev + 10);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (lazyLoaderRef.current) {
      observer.observe(lazyLoaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [articles, visibleArticles]);

  const renderArticles = () =>
    (articles || [])
      .slice(loadedArticles, visibleArticles)
      .map(({ id, image, title, excerpt }, index) => (
        <li key={id} className={styles.item}>
          <ArticleCard
            id={id}
            image={`/articles/1/${image}`}
            title={title}
            excerpt={excerpt}
          />
        </li>
      ));

  const renderNoMoreArticles = () => (
    <div style={{ textAlign: "center", color: "gray" }}>
      No more articles to load.
    </div>
  );

  return (
    <>
      <h1>Home</h1>

      <ul className={styles.list}>{renderArticles()}</ul>

      {visibleArticles >= (articles?.length || 0) && renderNoMoreArticles()}

      <div ref={lazyLoaderRef}></div>
    </>
  );
};

export default Home;
