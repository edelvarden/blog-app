import articlesData from './articles.json';
import BlogLayout from './BlogLayout';

function App() {

  return (
    <div className="App">

      <BlogLayout articles={articlesData.articles} />
    </div>
  )
}

export default App
