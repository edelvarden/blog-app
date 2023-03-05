import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import articles from './articles.json';
import Contact from './components/Contact';
import Container from "./components/Container";
import Create from './components/Create';
import Error404 from './components/Error404';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from './components/Home';
import ToTopButton from './components/ToTopButton';

const applyRouteMapping = (articles) => ({
  '/': <Home articles={articles} />,
  '/create': <Create />,
  '/contact': <Contact />,
  '/*': <Error404 />
});

const ArticleContent = ({ title, excerpt }) => {
  const location = useLocation();

  useEffect(() => {
    const titleElement = document.querySelector('h1');
    document.title = (titleElement) ? titleElement.textContent : "Home";
  }, [location]);

  return (
    <article style={{ maxWidth: '720px', margin: '0 auto' }}>
      <header>
        <h1>{title}</h1>
      </header>
      <section className="content">
        <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
      </section>
    </article>
  )
};

const renderRoutes = (articles) =>
  articles?.map((article, index) =>
    <Route key={index} path={`/article/${article.id}`} element={<ArticleContent title={article.title} excerpt={article.excerpt} />} />);



const App = () => {

  const [routes, setRoutes] = useState({
    '/': 'Home',
    '/create': 'Create',
    '/contact': 'Contact',
  });

  return (
    <div className="App">
      <Router>
        <Header routes={routes} />
        <main>
          <div>
            <Container>
              <Routes>
                {renderRoutes(articles)}
                {Object.entries(applyRouteMapping(articles)).map(([path, element]) => <Route key={path} path={path} element={element} />)}
              </Routes>

              <ToTopButton />
            </Container>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
