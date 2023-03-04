import articles from './articles.json';
import BlogLayout from './components/BlogLayout';

function App() {

  return (
    <div className="App">
      <BlogLayout articles={articles} />
    </div>
  )
}

export default App
