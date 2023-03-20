import BlogList from "components/BlogList";
import "./styles.scss";

const HomePage = ({ articles }) => {

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
