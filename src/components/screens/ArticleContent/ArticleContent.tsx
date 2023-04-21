import { useDateFormatter } from "@/hooks/useDateFormatter"
import { FC, useState } from "react"
import Layout from "@/components/layout/Layout"
import { IArticle } from "@/types";

const ArticleContent: FC<IArticle> = ({ id, title, date, body, image }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const formattedDate = useDateFormatter(`${date}`)

  const handleImageLoad = () => setIsImageLoaded(true)

  return (
    <Layout title={title}>
      <div className="d-flex justify-content-between align-items-center">
        {date && (
          <span className="blog-content__date">
            Published <time dateTime={date}>{formattedDate}</time>
          </span>
        )}
      </div>

      <section className="blog-content__section">
            <h1 className="blog-content__title">{title}</h1>
            <div className="blog-content__image">
              <img
                className={` ${isImageLoaded ? "loaded" : ""}`}
                src={image}
                alt={title}
                onLoad={handleImageLoad}
              />
            </div>
            <div
              className="blog-content__content"
              dangerouslySetInnerHTML={{ __html: body }}
            />
      </section>
    </Layout>
  )
}

export default ArticleContent
