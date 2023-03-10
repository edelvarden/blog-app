import { useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import articles from './articles.json';
import Container from './components/Container';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import ToTopButton from './components/ToTopButton';
import Create from './components/Create';
import Contact from './components/Contact';
import BlogContent from './components/BlogContent';

const routeTitles = {
  '/': 'Home',
  '/create': 'Create',
  '/contact': 'Contact',
};

const homeRoute = <Route path="/" element={<Home articles={articles} />} />;

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${routeTitles[pathname] || '404 Page Not Found'}`;
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top on routing
  }, [pathname]);

  const renderRoutes = useMemo(
    () =>
      articles?.length > 0 &&
      articles.map(({ id, title, date, content }) => (
        <Route
          key={id}
          exact
          path={`/articles/${id}`}
          element={<BlogContent title={title} date={date} content={content} />}
        />
      )),
    [articles]
  );

  const routes = useMemo(() => (
    <>
      {renderRoutes}
      {homeRoute}
      <Route path="/home" element={homeRoute.element} />
      <Route exact path="/create" element={<Create />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route path="/*" element={<Error404 />} />
    </>
  ), [renderRoutes]);

  return (
    <div className="App">
      <Header routes={routeTitles} />
      <main style={{ minHeight: '100vh' }}>
        <Container>
          <Routes>{routes}</Routes>
          <ToTopButton />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
