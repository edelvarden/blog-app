import BlogList from "components/BlogList";
import { useEffect } from 'react';
import "./styles.scss";

const HomePage = ({ articles }) => {

  useEffect(() => {
    document.title = 'Blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="home">
        <h1 className="home__title">Articles</h1>

        <BlogList articles={articles} />
      </div>
    </>
  );
};

export default HomePage;
