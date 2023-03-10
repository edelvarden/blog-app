import { useEffect } from 'react';
import "./styles.scss";
const ArticleDetail = ({ title, content }) => {
  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  return (
    <>
      <div className='article__container'>
        <h1>{title}</h1>
        <section>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </section>
      </div>
    </>
  );
};

export default ArticleDetail;