import BlogCard from "components/BlogCard";
import { Container, Row } from "react-bootstrap";
import "./styles.scss";

const BlogList = ({ articles }) => {
  const renderArticles = articles.map(
    ({ id, image, category, title, date = new Date(), excerpt }, key) => (
      <div key={key} className="list__item">
        <BlogCard
          id={id}
          image={`/articles/${id}/${image}`}
          category={category}
          title={title}
          date={date}
          excerpt={excerpt}
        />
      </div>
    )
  );

  return (
    <>
      <Container>
        <Row xs={1} md={2} lg={3} className="list g-4">
          {renderArticles}
        </Row>
      </Container>
      <div id="end-of-page" style={{ width: "100%" }} />
    </>
  );
};

export default BlogList;
