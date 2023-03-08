import { useEffect } from 'react';
import "./styles.scss";
const ArticleDetail = ({ title, excerpt }) => {
  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  return (
    <>
      <div className='article__container'>
        <h1>{title}</h1>
        <section>
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        </section>
      </div>
    </>
  );
};

export default ArticleDetail;