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

function renderRoutes(articles) {
  if (!articles || articles.length === 0) return null;

  return articles.map(({ id, title, date, content, image }) => (
      <Route
        key={id}
        path={`/articles/${id}`}
        element={<BlogContent title={title} image={image} date={date} content={content} />}
      />
    )
  );
}

const App = () => {
  const { pathname } = useLocation();
  const renderArticlesRoutes = useMemo(() => renderRoutes(articles), [articles]);

  useEffect(() => {
    const title = (routeTitles.find((r) => r.path === pathname) || {}).name || '404 Page Not Found';
    document.title = title;
    window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); // scroll to top on routing with smooth effect
  }, [pathname]);

  return (
    <div className="App">
      <Header path={pathname} routes={routeTitles} />
      <main style={{ minHeight: '100vh' }}>
        <Container>
          <Routes>
            {renderArticlesRoutes}
            {routeTitles.map(({path, component: Component, props}, key) => (
              <Route exact path={path} key={key} element={<Component {...props} />} />
            ))}
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
