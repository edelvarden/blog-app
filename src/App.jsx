import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import articles from './articles.json';
import Container from 'components/Container';
import Footer from 'components/Footer';
import Header from 'components/Header';
import HomePage from 'components/HomePage';
import ToTopButton from 'components/ToTopButton';
import Loader from 'components/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';

import hljs from './hljs';
window.hljs = hljs;

const LazyBlogContent = lazy(() => import('components/BlogContent'));

const App = () => {
  const [pathname, setPathname] = useState('/');
 
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  }, []);

  const routeTitles = useMemo(() => [
    { path: '/', name: 'Blog', component: HomePage, props: { articles } }
  ], []);

  const renderArticlesRoutes = useMemo(() =>
    articles.map(({ id, title, date, excerpt, content, image }) => (
      <Route
        key={id}
        path={`/articles/${id}`}
        element={
          <Suspense fallback={<Loader/>}>
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

  const handleLocationChange = ({ pathname }) => {
    const title = (routeTitles.find(({ path }) => path === pathname) || {}).name || '404 Page Not Found';
    document.title = title;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPathname(pathname);
  };

  useLocation(handleLocationChange);

  return (
      <div className="App">
        <Header path={pathname} routes={routeTitles} />
        <main style={{ minHeight: '100vh', paddingTop: '2em' }}>
          <Container>
            <Routes>
              {renderArticlesRoutes}
              {routeTitles.map(({ path, component: Component, props }, key) => (
                <Route exact key={key} path={path} element={
                  <Component {...props} />
                } />
              ))}
            </Routes>
            <ToTopButton />
          </Container>
        </main>
        <Footer />
      </div>
  );
};

export default App;
