import Content from "./Content";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function BlogLayout({ articles }) {
  return (
    <>
      <Header />
        <Container>
            <Content articles={articles} />
        </Container>
      <Footer />
    </>
  );
}

export default BlogLayout;