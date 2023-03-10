import { useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import articles from './articles.json';
import BlogContent from './components/BlogContent';
import Container from './components/Container';
import ContactPage from './components/ContactPage';
import CreatePage from './components/CreatePage';
import Error404Page from './components/Error404Page';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ToTopButton from './components/ToTopButton';

const routeTitles = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    props: { articles },
  },
  {
    path: '/create',
    name: 'Create',
    component: CreatePage,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
];

const App = () => {
  const { pathname } = useLocation();

  const routeComponents = useMemo(
    () =>
      routeTitles.map(({ path, component: Component, props }, key) => (
        <Route exact path={path} key={key} element={<Component {...props} />} />
      )),
    [routeTitles]
  );

  const renderRoutes = useMemo(() => {
    if (!articles || articles.length === 0) return null;

    return articles.map(({ id, title, date, content, image }) => (
      <Route
        key={id}
        path={`/articles/${id}`}
        element={<BlogContent title={title} image={image} date={date} content={content} />}
      />
    ));
  }, [articles]);

  useEffect(() => {
    const title = (routeTitles.find((r) => r.path === pathname) || {}).name || '404 Page Not Found';
    document.title = title;
    window.scrollTo(0, 0); // scroll to top on routing
  }, [pathname]);

  return (
    <div className="App">
      <Header path={pathname} routes={routeTitles} />
      <main style={{ minHeight: '100vh' }}>
        <Container>
          <Routes>
            {renderRoutes}
            {routeComponents}
            <Route path="*" element={<Error404Page />} />
          </Routes>
          <ToTopButton />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;
