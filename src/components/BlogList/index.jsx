import BlogCard from "components/BlogCard";
import { useEffect, useRef, useState } from "react";
import { Container, Row } from 'react-bootstrap';
import "./styles.scss";

const POSTS_PER_PAGE = 6;
const THRESHOLD = 1;

const BlogList = ({ articles }) => {
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);

  const visibleArticles = articles.slice(0, page * POSTS_PER_PAGE);

  const renderArticles = visibleArticles.map((article) => (
    <li key={article.id} className="list__item">
      <BlogCard
        id={article.id}
        image={`/articles/${article.id}/${article.image}`}
        category={article.category}
        title={article.title}
        date={article.date}
        excerpt={article.excerpt}
      />
    </li>
  ));

  const options = {
    rootMargin: "0px",
    threshold: THRESHOLD,
  };

  const handleObserver = ([entry]) => {
    if (entry.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, options);

    return () => {
      observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const endOfPageElem = document.querySelector("#end-of-page");
    observerRef.current.observe(endOfPageElem);

    return () => {
      observerRef.current.unobserve(endOfPageElem);
    };
  }, [observerRef, articles.length]);

  return (
    <Container>
      <Row xs={1} md={2} className="list g-4">
        {renderArticles}
        <div id="end-of-page" />
      </Row>
    </Container>
  );
};

export default BlogList;
