import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './BlogPage';
import ContactPage from './ContactPage';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';

const ArticleList = ({ articles }) => {

    // set document title on mount and title change
    useEffect(() => {
        const titleElement = document.querySelector('h1');
        document.title = titleElement.innerHTML;
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    {/* defined routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/*" element={<NotFoundPage />} />

                    {/* map all articles to their own route */}
                    {articles?.map((article, index) => (
                        <Route key={index} path={`/article/${article.id}`} element={
                            <>
                                <h1>{article.title}</h1>
                                <p>{article.excerpt}</p>
                            </>
                        } />
                    ))}
                </Routes>
            </Router>
        </>
    );
};

export default ArticleList;
