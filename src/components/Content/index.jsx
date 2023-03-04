import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Post from '../Post';
import Contact from '../Contact';
import Home from '../Home';
import ToTopButton from '../ToTopButton';
import styles from './styles.module.scss';

const applyRouteMapping = (articles) => ({
  '/': <Home articles={articles} />,
  '/post': <Post />,
  '/contact': <Contact />,
  '/*': <Home />
});

const ArticleContent = ({ title, excerpt }) => (
    <>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
    </>
);

const renderRoutes = (articles) =>
  articles?.map((article, index) =>
    <Route key={index} path={`/article/${article.id}`} element={<ArticleContent title={article.title} excerpt={article.excerpt} />} />);

const Content = ({ articles }) => {
  const location = useLocation();

  useEffect(() => {
    const titleElement = document.querySelector('h1');
    document.title = (titleElement) ? titleElement.textContent : "Home";
  }, [location]);


  return (
    <>
      <Routes>
        {renderRoutes(articles)}
        {Object.entries(applyRouteMapping(articles)).map(([path, element]) => <Route key={path} path={path} element={element} />)}
      </Routes>
      <ToTopButton />
    </>
  );
};

export default Content;
