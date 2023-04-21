import axios from "axios"
import customArticles from "@/data/articles.json"
import { IArticle } from "@/types"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export const useGetArticles = (): IArticle[] => {
  const [articles, setArticles] = useState<IArticle[]>(customArticles)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const { pathname } = useRouter()

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
