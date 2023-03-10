import { useCallback, useEffect, useRef, useState } from "react";
import BlogCard from "../BlogCard";
import "./styles.scss";

const BlogList = ({ articles }) => {
  const [visibleArticles, setVisibleArticles] = useState(6);
  const lazyLoaderRef = useRef(null);
  const lastListItemRef = useRef(null);

  const handleObserver = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && visibleArticles < articles?.length) {
        if (lastListItemRef.current) {
          const lastListItemOffset =
            lastListItemRef.current.offsetTop + lastListItemRef.current.clientHeight;
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
      .map(({ id, image, title, date, excerpt }, index) => (
        <li key={id} className={`list__item ${index === visibleArticles - 1 ? 'last-list-item' : ''}`}>
          <BlogCard
            id={id}
            image={`/articles/${id}/${image}`}
            title={title}
            date={date}
            excerpt={excerpt}
          />
        </li>
      ));

  return (
    <>
      <ul className="list">{renderArticles()}</ul>

      {visibleArticles >= (articles?.length || 0) ? (
        <div style={{ textAlign: "center", color: "gray" }}>No more articles to load.</div>
      ) : null}

      <div ref={lazyLoaderRef} />

      <div ref={lastListItemRef} />
    </>
  );
};

export default BlogList;
