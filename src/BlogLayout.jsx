import Content from "./Content";
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
            <Content articles={articles} />
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default BlogLayout;