import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "components/Footer";
import Header from "components/Header";
import HomePage from "components/HomePage";
import Loader from "components/Loader";
import ToTopButton from "components/ToTopButton";
import { lazy, Suspense, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import useGetArticles from "hooks/useGetArticles";

const App = () => {
  const articles = useGetArticles();

  const LazyBlogContent = lazy(() => import("components/BlogContent"));
  const renderArticlesRoutes = useMemo(
    () =>
      articles.map(
        (
          { id, title, date = new Date(), excerpt = "", body, image = "" },
          key
        ) => (
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
                  date={date}
                  content={body}
                />
              </Suspense>
            }
          />
        )
      ),
    [articles]
  );

  return (
    <div className="App">
      <Header routes={[{ path: "/", name: "Blog" }]} />
      <main style={{ minHeight: "100vh", padding: "2em 0" }}>
        <Routes>
          {renderArticlesRoutes}
          <Route exact path={"/"} element={<HomePage articles={articles} />} />
        </Routes>
        <ToTopButton />
      </main>
      <Footer />
    </div>
  );
};

export default App;
