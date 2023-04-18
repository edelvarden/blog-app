import axios from "axios"
import customArticles from "data/articles.json"
import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

interface IArticles {
  id: number
  title: string
  body: string
  author?: string
  date?: string
  category?: string
  excerpt?: string
}

export const useGetArticles = () => {
  const [articles, setArticles] = useState<IArticles[]>(customArticles)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const currentLocation = useLocation()
  const location = useMemo(() => currentLocation, [currentLocation])

  useEffect(() => {
    if (isFetching) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`)
        .then((res) => {
          setArticles([...articles, ...res.data])
          setPageNumber((prevState) => prevState + 1)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setIsFetching(false))
    }
  }, [articles, isFetching, pageNumber])

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location])

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY

    if (Math.round(windowHeight + scrollTop) >= documentHeight) {
      setIsFetching(true)
    }
  }

  return articles
}
