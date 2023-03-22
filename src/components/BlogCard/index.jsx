import useDateFormatter from "hooks/useDateFormatter";
import { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";

const BlogCard = ({ id, image, title, category, date, excerpt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
      <Card className="card-block" border="light">
        <Link className="card-block__link" to={`/articles/${id}`}>
          <div className="card-block__image">
            <Card.Img
              variant="top"
              src={image}
              alt={title}
              onLoad={handleImageLoad}
              className={isImageLoaded ? "loaded" : ""}
            />
          </div>
          <Card.Body>
            <div className="card-block__category">
              <span className="card-block__category-item">{category}</span>
            </div>
            <Card.Title className="card-block__title">{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {date && (
                <time className="card-block__date" dateTime={date}>
                  {useDateFormatter(date)}
                </time>
              )}
            </Card.Subtitle>

            <Card.Text className="card-block__excerpt">{excerpt}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
  );
};

export default BlogCard;
