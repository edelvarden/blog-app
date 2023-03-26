import { useState, useEffect } from "react"
import customArticles from "./../articles.json"
import axios from 'axios';

const useGetAllArticles = () => {
  const [articles, setArticles] = useState(customArticles);
  const [pageNumber, setPageNumber] = useState(1);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if(fetching){
      axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`)
      .then(res => {
        setArticles([...articles, ...res.data]);
        setPageNumber(prevState => prevState + 1);
      })
      .catch(err => {
        console.log(err);
      }).finally(() => setFetching(false))
    }
  }, [fetching]);

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleScroll(e));
    return () => window.removeEventListener('scroll', (e) => handleScroll(e));
  }, []);


  const handleScroll = (e) => {
    if ((e.target.querySelector('#end-of-page').getBoundingClientRect().top <= window.innerHeight)) {
      setFetching(true)
    }
  }

  return articles;
}

export default useGetAllArticles;