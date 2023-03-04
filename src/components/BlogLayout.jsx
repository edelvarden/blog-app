import Container from "./Container";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const BlogLayout = ({ articles }) => {
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