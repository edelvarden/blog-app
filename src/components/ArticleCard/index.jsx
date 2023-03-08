import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const ArticleCard = ({ id, image, title, excerpt: rawHtml }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [displayImage, setDisplayImage] = useState("none");
  const preview = rawHtml.includes("<p>")
    ? rawHtml.split("<p>").splice(1).join("").replace("</p>", "") // extract text from first <p>
    : rawHtml.split(" ").splice(0, 30).join(" ") + "..."; // apply some logic to get a preview without HTML tags

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setDisplayImage("block");
  };

  return (
    <article className="article">
      <Link className="article__link" to={`/articles/${id}`}>
        <div className="article__image">
          <img
            src={image}
            alt={title}
            onLoad={handleImageLoad}
            style={{ display: displayImage }}
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
