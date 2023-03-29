import { useState, useEffect, useMemo } from "react";
import customArticles from "./../articles.json";
import { useLocation } from "react-router-dom";
import axios from "axios";

const useGetArticles = () => {
  const [articles, setArticles] = useState(customArticles);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const currentLocation = useLocation();
  const location = useMemo(() => currentLocation, [currentLocation]);

  useEffect(() => {
    if (isFetching) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
        )
        .then(res => {
          setArticles([...articles, ...res.data]);
          setPageNumber(prevState => prevState + 1);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setIsFetching(false));
    }
  }, [isFetching, pageNumber]);

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (Math.round(windowHeight + scrollTop) >= documentHeight) {
      console.log("End of page reached!");
      setIsFetching(true);
    }
  };

  return articles;
};

export default useGetArticles;
