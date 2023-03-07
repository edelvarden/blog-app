import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const ArticleCard = ({ id, image, title, excerpt }) => {
  const preview = excerpt.split("<p>")[1] || excerpt;

  return (
    <article className="article">
      <Link className="article__link" to={`/article/${id}`}>
        <div className="article__image">
          <img src={image} alt={title} />
        </div>
        <div className="article__content">
          <h2 className="article__title">{title}</h2>
          <p
            className="article__paragraph"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
