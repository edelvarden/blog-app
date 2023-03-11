import { useEffect, useRef, useState } from "react";
import BlogCard from "../BlogCard";
import "./styles.scss";

const BlogList = ({ articles, numArticlesToShow = 3, renderCard = (props) => null }) => {
  const lazyLoaderRef = useRef(null);

  const [visibleArticles, setVisibleArticles] = useState(articles?.slice(0, numArticlesToShow) || []);

  const lastVisibleArticleRef = useRef(null);

  useEffect(() => {
    lastVisibleArticleRef.current = visibleArticles.slice(-1)[0];
  }, [visibleArticles]);

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          lastVisibleArticleRef.current !== articles?.[articles.length - 1]
        ) {
          setVisibleArticles((prevVisibleArticles) =>
            articles.slice(0, prevVisibleArticles.length + numArticlesToShow)
          );
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
  }, [articles, numArticlesToShow]);

  const renderArticles = () =>
    visibleArticles.map((article, index) => {
      const props = {
        id: article.id,
        image: `/articles/${article.id}/${article.image}`,
        title: article.title,
        date: article.date,
        excerpt: article.excerpt,
      };
      return (
        <li
          key={article.id}
          className={`list__item ${
            index === visibleArticles?.length - 1 ? "last-list-item" : ""
          }`}
        >
          {renderCard(props) ?? <BlogCard {...props} />}
        </li>
      );
    });

  return (
    <>
      <ul className="list">{renderArticles()}</ul>

      {visibleArticles?.length === articles?.length && (
        <div className="no-more-articles">No more articles to load.</div>
      )}

      <div ref={lazyLoaderRef}></div>
    </>
  );
};

export default BlogList;
