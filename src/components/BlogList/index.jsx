import BlogCard from "components/BlogCard"
import { Container, Row } from "react-bootstrap"
import "./styles.scss"

const BlogList = ({ articles }) => {
  const renderArticles = articles.map((article, key) => (
    <div key={key} className="list__item">
      <BlogCard
        id={article.id}
        image={`/articles/${article.id}/${article.image}`}
        category={article.category}
        title={article.title}
        date={article.date}
        excerpt={article.excerpt}
      />
    </div>
  ))

  return (
    <>
      <Container>
        <Row xs={1} md={2} lg={3} className="list g-4">
          {renderArticles}
        </Row>
      </Container>
      <div id="end-of-page" style={{ width: "100%" }} />
    </>
  )
}

export default BlogList
