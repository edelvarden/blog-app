import "bootstrap/dist/css/bootstrap.min.css"
import Footer from "components/Footer"
import Header from "components/Header"
import Loader from "components/Loader"
import ToTopButton from "components/ToTopButton"
import { useGetArticles } from "hooks/useGetArticles"
import Home from "pages/Home"
import { FC, lazy, Suspense, useMemo } from "react"
import { Route, Routes } from "react-router-dom"

const App: FC = () => {
  const articles = useGetArticles()

  const LazyBlogContent = lazy(() => import("pages/BlogContent"))
  const renderArticlesRoutes = useMemo(
    () =>
      articles.map(({ id, title, date = new Date(), excerpt = "", body, image = "" }, key) => (
        <Route
          key={key}
          path={`/articles/${id}`}
          element={
            <Suspense fallback={<Loader />}>
              <LazyBlogContent
                id={id}
                title={title}
                excerpt={excerpt}
                image={image}
                date={`${date}`}
                content={body}
              />
            </Suspense>
          }
        />
      )),
    [articles, LazyBlogContent]
  )

  return (
    <div className="App">
      <Header routes={[{ path: "/", name: "Blog" }]} />
      <main style={{ minHeight: "100vh", padding: "2em 0" }}>
        <Routes>
          {renderArticlesRoutes}
          <Route path={"/"} element={<Home articles={articles} />} />
        </Routes>
        <ToTopButton />
      </main>
      <Footer />
    </div>
  )
}

export default App
