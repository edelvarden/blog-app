import { useCallback, useEffect, useRef, useState } from "react";
import BlogCard from "../BlogCard";
import "./styles.scss";

const BlogList = ({ articles }) => {
  const [visibleArticles, setVisibleArticles] = useState(3);
  const lazyLoaderRef = useRef(null);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleObserver = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && visibleArticles < (articles?.length || 0)) {
        const lastListItem = entry.target.previousElementSibling;
        if (lastListItem) {
          const lastListItemOffset =
            lastListItem.offsetTop + lastListItem.clientHeight;
          const windowOffset = window.pageYOffset + window.innerHeight;
          if (windowOffset > lastListItemOffset - 100) {
            setVisibleArticles(
              previousVisibleArticles => previousVisibleArticles + 10
            );
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
  }, [handleObserver]);

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

      {visibleArticles >= (articles?.length || 0) && (
        <div className="no-more-articles">
          No more articles to load.
        </div>
      )}

      <div ref={lazyLoaderRef}></div>
    </>
  );
};

export default BlogList;
