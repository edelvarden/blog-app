import customArticles from "@/data/articles.json"
import { IArticle } from "@/types"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const API_URL = "https://jsonplaceholder.typicode.com/posts"
// const API_URL = "/api/articles"

export const useGetArticles = (): IArticle[] => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const { pathname } = useRouter()

  useEffect(() => {
    if (isFetching) {
      axios
        .get<IArticle[]>(`${API_URL}?_limit=10&_page=${pageNumber}`)
        .then((res) => {
          setArticles((prevArticles) => [...prevArticles, ...res.data])
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
          // console.log(`${res.data}`);
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => setIsFetching(false))
    }
  }, [isFetching, pageNumber])

  useEffect(() => {
    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

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
