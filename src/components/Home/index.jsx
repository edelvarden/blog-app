import { useCallback, useEffect, useRef, useState } from "react";
import BlogList from "../BlogList";
import "./styles.scss";

const Home = ({ articles }) => {

  return (
    <>
      <div className="home">
        <h1 className="home__title">Home</h1>

        <BlogList articles={articles}/>
      </div>
    </>
  );
};

export default Home;
