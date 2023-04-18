import { useDateFormatter } from "hooks/useDateFormatter"
import { FC, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./BlogCard.scss"

interface IBlogCardProps {
  id: number
  image: string
  title: string
  category: string
  date: string
  excerpt: string
}

const BlogCard: FC<IBlogCardProps> = ({ id, image, title, category, date, excerpt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const handleImageLoad = () => setIsImageLoaded(true)
  const formattedDate = useDateFormatter(date)

  return (
    <>
      <Card className="card-block">
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
          <Card.Body className="card-block__content">
            <div className="card-block__category">
              <span className="card-block__category-item">{category}</span>
            </div>
            <Card.Title className="card-block__title">{title}</Card.Title>
            <Card.Subtitle className="card-block__date mb-2">
              {date && <time dateTime={date}>{`${formattedDate}`}</time>}
            </Card.Subtitle>
            <Card.Text className="card-block__excerpt">{excerpt}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  )
}

export default BlogCard
