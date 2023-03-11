import { useState, useEffect, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import articles from './articles.json';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BlogContent from './components/BlogContent';
import CreatePage from './components/CreatePage'
import ContactPage from './components/ContactPage'
import ToTopButton from './components/ToTopButton';

const App = () => {
  const { pathname } = useLocation();

  const routeTitles = [
    { path: '/', name: 'Blog', component: HomePage, props: { articles } },
    { path: '/create', name: 'Create', component: CreatePage },
    { path: '/contact', name: 'Contact', component: ContactPage },
  ];

  const renderArticlesRoutes = useMemo(() =>
    articles.map(({ id, title, date, content, image }) => (
      <Route
        key={id}
        path={`/articles/${id}`}
        element={<BlogContent id={id} title={title} image={image} date={date} content={content} />}
      />
    )), [articles]
  );

  useEffect(() => {
    const title = (routeTitles.find(({path}) => path === pathname) || {}).name || '404 Page Not Found';
    document.title = title;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

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
