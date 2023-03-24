import 'bootstrap/dist/css/bootstrap.min.css';
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Footer from 'components/Footer';
import Header from 'components/Header';
import HomePage from 'components/HomePage';
import Loader from 'components/Loader';
import ToTopButton from 'components/ToTopButton';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import articles from './articles.json';

const LazyBlogContent = lazy(() => import('components/BlogContent'));

const App = () => {
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const routeTitles = useMemo(() => [
    { path: '/', name: 'Blog', component: HomePage, props: { articles } },
  ], []);

  const renderArticlesRoutes = useMemo(() =>
    articles.map(({ id, title, date, excerpt, content, image }) => (
      <Route
        key={id}
        path={`/articles/${id}`}
        element={
          <Suspense fallback={<Loader />}>
            <LazyBlogContent
              id={id}
              title={title}
              excerpt={excerpt}
              image={image}
              date={date}
              content={content}
            />
          </Suspense>
        }
      />
    )),
    [articles]
  );


  return (
    <div className="App">
      <Header path={pathname} routes={routeTitles} />
      <main style={{ minHeight: '100vh', paddingTop: '2em' }}>
        <Routes>
          {renderArticlesRoutes}
          {routeTitles.map(({ path, component: Component, props }, key) => (
            <Route exact key={key} path={path} element={
              <Component {...props} />
            } />
          ))}
        </Routes>
        <ToTopButton />
      </main>
      <Footer />
    </div>
  );
};

export default App;