import { useCallback, useEffect, useRef, useState } from "react";
import ArticleCard from "../ArticleCard";
import "./styles.scss";

const Home = ({ articles }) => {
  const [visibleArticles, setVisibleArticles] = useState(6);
  const lazyLoaderRef = useRef(null);

  const handleObserver = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && visibleArticles < articles?.length) {
        const lastListItem = document.querySelector(`.list > .list__item:last-of-type`);
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
      .map(({ id, image, title, date, excerpt }) => (
        <li key={id} className="list__item">
          <ArticleCard
            id={id}
            image={`/articles/${id}/${image}`}
            title={title}
            date={date}
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
      <div className="home">
        <h1 className="home__title">Home</h1>

        <ul className="list">{renderArticles()}</ul>

        {visibleArticles >= (articles?.length || 0) ? renderNoMoreArticles() : null}

        <div ref={lazyLoaderRef} />
      </div>
    </>
  );
};

export default Home;
