import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import placeholderImage from "/placeholder.webp";

const ArticleCard = ({ id, image, title, date, excerpt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const showImage = isImageLoaded ? "block" : "none";

  const getDateFormatted = (d) => {
    const dateObj = new Date(d);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return dateObj.toLocaleDateString("en-US", options);
  };

  return (
    <article className="card">
      <Link className="card__link" to={`/articles/${id}`}>
        <div className="card__image" style={{ display: showImage }}>
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
        <div className="card__content">
          <h2 className="card__title">{title}</h2>
          {date && (
            <time className="card__date" dateTime={date}>
              {getDateFormatted(date)}
            </time>
          )}
          <p className="card__excerpt">{excerpt}</p>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
