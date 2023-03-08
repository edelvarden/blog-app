import { useEffect, useRef, useState, useCallback } from "react";
import ArticleCard from "../ArticleCard";
import styles from "./styles.module.scss";

const Home = ({ articles }) => {
  const [visibleArticles, setVisibleArticles] = useState(5);
  const lazyLoaderRef = useRef(null);

  const handleObserver = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && visibleArticles < articles?.length) {
        const lastListItem = document.querySelector(`.${styles.list} > li:last-of-type`);
        if (lastListItem) {
          const lastListItemOffset = lastListItem.offsetTop + lastListItem.clientHeight;
          const windowOffset = window.pageYOffset + window.innerHeight;
          if (windowOffset > lastListItemOffset - 100) {
            setVisibleArticles(visibleArticles + 10);
          }
        }
      }
    });
  }, [articles, visibleArticles]);

  useEffect(() => {
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
  }, [handleObserver, lazyLoaderRef]);

  const renderArticles = () =>
    articles
      ?.slice(0, visibleArticles)
      .map(({ id, image, title, excerpt }) => (
        <li key={id} className={styles.item}>
          <ArticleCard
            id={id}
            image={`/articles/${id}/${image}`}
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

      {visibleArticles >= (articles?.length || 0) ? renderNoMoreArticles() : null}

      <div ref={lazyLoaderRef} />
    </>
  );
};

export default Home;
