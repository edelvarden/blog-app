import customArticles from "@/data/articles.json"
import { IArticle } from "@/types"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const useGetArticles = (): IArticle[] => {
  const [articles, setArticles] = useState<IArticle[]>(customArticles)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const { pathname } = useRouter()

  useEffect(() => {
    if (isFetching) {
      axios
        .get<IArticle[]>(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`)
        .then((res) => {
          setArticles((prevArticles) => [...prevArticles, ...res.data]);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
          // console.log(`${res.data}`);
        })
        .catch((error) => {
          console.log(error)
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
