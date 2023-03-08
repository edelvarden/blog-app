import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import articles from './articles.json';
import Contact from './components/Contact';
import Container from "./components/Container";
import Create from './components/Create';
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

const App = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${routeTitles[location.pathname] || "404 Page Not Found"}`;
  }, [location.pathname]);

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
    articles.map((article) => (
      <Route
        key={article.id}
        exact
        path={`/articles/${article.id}`}
        element={<ArticleDetail title={article.title} excerpt={article.excerpt} />}
      />
    ));

  return (
    <>
      <div className="App">
        <Header routes={routeTitles} />
        <main>
          <Container>
            <Routes>
              {renderRoutes()}
              <Route exact path="/" element={<Home articles={articles} />} />
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route path="/*" element={<Error404 />} />
            </Routes>

            <ToTopButton />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
