import { useEffect, useState } from 'react';
import useDateFormatter from "./../../hooks/useDateFormatter";
import './styles.scss';
import placeholderImage from "/placeholder.webp";

const BlogContent = ({ title, date, content, image }) => {
  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const showImage = isImageLoaded ? "block" : "none";

  return (
    <div className="blog-content">
      <p className="blog-content__date">{`Published ${useDateFormatter(date)}`}</p>
      <h1 className="blog-content__title">{title}</h1>
      <div className="blog-content__image" style={{ display: showImage }}>
          <img
            src={image}
            alt={title}
            onLoad={handleImageLoad}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
          />
        </div>
      <section className="blog-content__section">
        <div
          className="blog-content__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
    </div>
  );
};

export default BlogContent;
