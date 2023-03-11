import { useEffect, useState } from 'react';
import useDateFormatter from "./../../hooks/useDateFormatter";
import './styles.scss';

const BlogContent = ({ title, date, content, image }) => {
  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
    <div className="blog-content">
      <p className="blog-content__date">{`Published ${useDateFormatter(date)}`}</p>
      <h1 className="blog-content__title">{title}</h1>
      <div className="blog-content__image">
        <img
          className={isImageLoaded ? "loaded" : ""}
          src={image}
          alt={title}
          onLoad={handleImageLoad}
        />
      </div>
      <section className="blog-content__section">
        <div className="blog-content__content"
          dangerouslySetInnerHTML={{ __html: content }}
          ></div>
      </section>
    </div>
  );
};

export default BlogContent;
