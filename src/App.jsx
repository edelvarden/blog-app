import { useEffect, lazy, Suspense, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import articles from './articles.json';
import Container from './components/Container';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Loader from './components/Loader';
import ToTopButton from './components/ToTopButton';

const routeTitles = {
  '/': 'Home',
  '/create': 'Create',
  '/contact': 'Contact',
};

const Create = lazy(() => import('./components/Create'));
const Contact = lazy(() => import('./components/Contact'));
const ArticleDetail = lazy(() => import('./components/ArticleDetail'));

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${routeTitles[pathname] || '404 Page Not Found'}`;
  }, [pathname]);

  const renderRoutes = useMemo(() => (
    articles?.length > 0 &&
    articles.map(({ id, title, excerpt }) => (
      <Route
        key={id}
        exact
        path={`/articles/${id}`}
        element={
          <Suspense fallback={<Loader/>}>
            <ArticleDetail title={title} excerpt={excerpt} />
          </Suspense>
        }
      />
    ))
  ), [articles]);

  return (
    <div className="App">
      <Header routes={routeTitles} />
      <main style={{ minHeight: '100vh' }}>
        <Container>
          <Routes>
            {renderRoutes}
            <Route exact path="/" element={<Home articles={articles} />} />
            <Route exact path="/home" element={<Home articles={articles} />} />
            <Route
              exact
              path="/create"
              element={
                <Suspense fallback={<Loader/>}>
                  <Create />
                </Suspense>
              }
            />
            <Route
              exact
              path="/contact"
              element={
                <Suspense fallback={<Loader/>}>
                  <Contact />
                </Suspense>
              }
            />
            <Route path="/*" element={<Error404 />} />
          </Routes>

          <ToTopButton />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
