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

const renderRoutes = (articles) => articles?.map(({ id, title, excerpt }, index) =>
  <Route key={index} exact path={`/article/${id}`} element={<ArticleContent title={title} excerpt={excerpt} />} />
);

const App = () => (
  <div className="App">
    <Router>
      <Header
      routes={{
        '/': 'Home',
        '/create': 'Create',
        '/contact': 'Contact',
      }} />
      <main>
        <div>
          <Container>
            <Routes>
              {renderRoutes(articles)}
              <Route exact path="/" element={<Home articles={articles} />} />
              <Route path="/create" element={<Create />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*" element={<Error404 />} />
            </Routes>

            <ToTopButton />
          </Container>
        </div>
      </main>
      <Footer />
    </Router>
  </div>
);

export default App;
