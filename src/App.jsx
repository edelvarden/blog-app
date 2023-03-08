import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import articles from './articles.json';
import Container from "./components/Container";
import Error404 from './components/Error404';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from './components/Home';
import ToTopButton from './components/ToTopButton';

const routeTitles = {
  '/': 'Home',
  '/create': 'Create',
  '/contact': 'Contact',
};

const Create = lazy(() => import('./components/Create'));
const Contact = lazy(() => import('./components/Contact'));

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${routeTitles[pathname] || '404 Page Not Found'}`;
  }, [pathname]);

  const ArticleDetail = ({ title, excerpt }) => {
    useEffect(() => {
      document.title = `${title}`;
    }, [title]);

    return (
      <>
        <h1>{title}</h1>
        <section>
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        </section>
      </>
    );
  };

  const renderRoutes = () =>
    articles?.length > 0 &&
    articles.map(({ id, title, excerpt }) => (
      <Route
        key={id}
        exact
        path={`/articles/${id}`}
        element={<ArticleDetail title={title} excerpt={excerpt} />}
      />
    ));

  return (
    <div className="App">
      <Header routes={routeTitles} />
      <main style={{minHeight: '100vh'}}>
        <Container>
          <Routes>
            {renderRoutes()}
            <Route exact path="/" element={<Home articles={articles} />} />
            <Route
              exact
              path="/create"
              element={
                <Suspense>
                  <Create />
                </Suspense>
              }
            />
            <Route
              exact
              path="/contact"
              element={
                <Suspense >
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