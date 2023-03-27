import { useState, useEffect } from "react"
import customArticles from "./../articles.json"
import axios from "axios"

const useGetAllArticles = () => {
  const [articles, setArticles] = useState(customArticles)
  const [pageNumber, setPageNumber] = useState(1)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (fetching) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
        )
        .then(res => {
          setArticles([...articles, ...res.data])
          setPageNumber(prevState => prevState + 1)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => setFetching(false))
    }
  }, [fetching, pageNumber])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScroll = () => {
    const endOfPageElement = document.querySelector("#end-of-page")
    if (
      endOfPageElement &&
      endOfPageElement.getBoundingClientRect().top <= window.innerHeight
    ) {
      setFetching(true)
    }
  }

  return articles
}

export default useGetAllArticles
