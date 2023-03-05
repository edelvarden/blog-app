import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Contact from './components/Contact';
import Container from "./components/Container";
import Create from './components/Create';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from './components/Home';
import ToTopButton from './components/ToTopButton';
import articles from './articles.json';

const applyRouteMapping = (articles) => ({
  '/': <Home articles={articles} />,
  '/create': <Create />,
  '/contact': <Contact />,
  '/*': <Home />
});

const ArticleContent = ({ title, excerpt }) => {
  const location = useLocation();

  useEffect(() => {
    const titleElement = document.querySelector('h1');
    document.title = (titleElement) ? titleElement.textContent : "Home";
  }, [location]);

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
    </>
  )
};

const renderRoutes = (articles) =>
  articles?.map((article, index) =>
    <Route key={index} path={`/article/${article.id}`} element={<ArticleContent title={article.title} excerpt={article.excerpt} />} />);



const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <Routes>
            {renderRoutes(articles)}
            {Object.entries(applyRouteMapping(articles)).map(([path, element]) => <Route key={path} path={path} element={element} />)}
          </Routes>

          <ToTopButton />
        </Container>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
