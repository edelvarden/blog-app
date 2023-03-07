import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const ArticleCard = ({ id, image, title, excerpt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const preview = excerpt.split("<p>")[1] || excerpt;

  return (
    <article className="article">
      <Link className="article__link" to={`/article/${id}`}>
        <div className="article__image">
          {!isImageLoaded && (
            <div className="skeleton-image pulse"></div>
          )}
          <img
            src={image}
            alt={title}
            onLoad={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? "block" : "none" }}
          />
        </div>
        <div className="article__content">
          <h2 className="article__title">{title}</h2>
          <p className="article__paragraph">{preview}</p>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
