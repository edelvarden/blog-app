import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Blog from './Pages/Blog';
import Contact from './Pages/Contact';
import Home from './Pages/Home';

const Content = ({ articles }) => {


    const location = useLocation();

    // change the tab title to h1 content
    useEffect(() => {
        const titleElement = document.querySelector('h1');
        document.title = (titleElement) ? titleElement.textContent : "Home";
    }, [location]);

    return (
        <>
            <Routes>
                {/* map all articles to their own route */}
                {articles?.map((article, index) => (
                    <Route key={index} path={`/article/${article.id}`} element={
                        <>
                            <h1>{article.title}</h1>
                            <p>{article.excerpt}</p>
                        </>
                    } />
                ))}

                {/* defined routes */}
                <Route path="/" element={<Home articles={articles} />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </>
    );
};

export default Content;
