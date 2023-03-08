import {useEffect} from 'react';
const ArticleDetail = ({ title, excerpt }) => {
    useEffect(() => {
      document.title = `${title}`;
    }, [title]);

    return (
      <>
        <h1>{title}</h1>
        <section>
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        </section>
      </>
    );
  };

  export default ArticleDetail;