import { Link } from 'react-router-dom';

const Home = ({ articles }) => {
  return (
    <>
      <h1>Home</h1>

      {/* Map over articles and display them */}
      <ul>
        {articles?.map((article) => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>
              <h2>{article.title}</h2>
              <p>{article.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;