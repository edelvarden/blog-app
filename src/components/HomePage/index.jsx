import BlogList from "../BlogList";
import "./styles.scss";

const HomePage = ({ articles }) => {

  return (
    <>
      <div className="home">
        <h1 className="home__title">Home</h1>

        <BlogList articles={articles} />
      </div>
    </>
  );
};

export default HomePage;
