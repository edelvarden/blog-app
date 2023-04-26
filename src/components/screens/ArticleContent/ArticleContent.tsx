import Layout from "@/components/layout/Layout"
import { useDateFormatter } from "@/hooks/useDateFormatter"
import { IArticle } from "@/types"
import { FC, useState } from "react"

const ArticleContent: FC<IArticle> = ({ id, title, date, body, image }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)
  const formattedDate = useDateFormatter(`${date}`)

  const handleImageLoad = () => setIsImageLoaded(true)

  return (
    <Layout title={title}>
      <div className="my-8 px-4">
        <article className="blog mx-auto text-left">
          <header>
            <div className="flex items-center justify-between">
              {date && (
                <span>
                  Published <time dateTime={date}>{formattedDate}</time>
                </span>
              )}
            </div>
            <h1>{title}</h1>
            <div>
              <img
                className={`mb-[5.5em] ${isImageLoaded ? "loaded" : ""}`}
                src={image}
                alt={title}
                onLoad={handleImageLoad}
              />
            </div>
          </header>

          <section className="mt-[2em]" aria-label="Blog content">
            <div
              dangerouslySetInnerHTML={{
                __html: body,
              }}
            />
          </section>
        </article>
      </div>
    </Layout>
  )
}

export default ArticleContent
