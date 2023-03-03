import ArticleList from "./ArticleList";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function BlogLayout({ articles }) {
  return (
    <>
      <Header />
      <div className="blog-layout">
        <Container>
          <div className="blog-layout-content">
            <ArticleList articles={articles} />
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default BlogLayout;