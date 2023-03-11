import { useState } from "react";
import { Link } from "react-router-dom";
import useDateFormatter from "./../../hooks/useDateFormatter";
import "./styles.scss";

const BlogCard = ({ id, image, title, category, date, excerpt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
    <article className="card">
      <Link className="card__link" to={`/articles/${id}`}>
        <div className="card__image">
          <img
            className={isImageLoaded ? "loaded" : ""}
            src={image}
            alt={title}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="card__content">
          <div className="card__category">
            <span className="card__category-item">{category}</span>
          </div>
          <h2 className="card__title">{title}</h2>
          {date && (
            <time className="card__date" dateTime={date}>
              {useDateFormatter(date)}
            </time>
          )}
          <p className="card__excerpt">{excerpt}</p>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
