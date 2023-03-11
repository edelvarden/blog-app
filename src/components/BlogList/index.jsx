import { useEffect, useRef, useState, useMemo } from "react";
import BlogCard from "../BlogCard";
import "./styles.scss";

const BlogList = ({ articles, numArticlesToShow = 3, renderCard = (props) => null }) => {
  const [visibleArticles, setVisibleArticles] = useState(() => articles?.slice(0, numArticlesToShow) || []);
  
  const lastArticleRef = useRef();

  const intersectionObserver = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && visibleArticles.length < articles.length) {
            setVisibleArticles((prevVisibleArticles) =>
              articles.slice(0, prevVisibleArticles.length + numArticlesToShow)
            );
          }
        },
        { rootMargin: "20px" }
      ),
    [articles, visibleArticles.length]
  );

  useEffect(() => {
    const observer = intersectionObserver;

    if (lastArticleRef.current) {
      observer.observe(lastArticleRef.current);
    }

    return () => {
      observer.disconnect();
    }
  }, [intersectionObserver]);

  const renderArticles = useMemo(() =>
      visibleArticles.map((article, index) => {
        const props = {
          id: article.id,
          image: `/articles/${article.id}/${article.image}`,
          title: article.title,
          date: article.date,
          excerpt: article.excerpt
        };

        return (
          <li
            key={article.id}
            className={`list__item ${index === visibleArticles.length - 1 ? "last-list-item" : ""}`}
          >
            {renderCard(props) ?? <BlogCard {...props} />}
          </li>
        );
      }),
    [visibleArticles, renderCard]
  );

  return (
    <>
      <ul className="list">
        {renderArticles}
        <div ref={lastArticleRef}></div>
      </ul>

      {visibleArticles.length === articles.length && (
        <div className="no-more-articles">No more articles to load.</div>
      )}
    </>
  );
};

export default BlogList;
