import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const ArticleCard = ({ id, image, title, excerpt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const preview = excerpt.includes("<p>")
    ? excerpt.split("<p>").splice(1).join("").replace("</p>", "") // extract text from first <p>
    : excerpt.split(" ").splice(0, 30).join(" ") + "..."; // apply some logic to get a preview without HTML tags

  const handleImageError = (event) => {
    event.target.src = "/articles/260x260.webp"; // set the source to the fallback image
    setIsImageLoaded(true); // make sure the fallback image is not considered as failed
  };

  return (
    <article className="article">
      <Link className="article__link" to={`/articles/${id}`}>
        <div className="article__image">
          {!isImageLoaded && <div className="skeleton-image pulse"></div>}
          <img
            src={image}
            alt={title}
            onLoad={() => setIsImageLoaded(true)}
            onError={handleImageError} // handle the error event
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
