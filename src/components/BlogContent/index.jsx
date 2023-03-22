import ModalWindow from "components/ModalWindow";
import useDateFormatter from "hooks/useDateFormatter";
import { memo, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.scss";

const BlogContent = memo(({ id, title, date, excerpt, content, image }) => {
  const [blogTitle, setBlogTitle] = useState(title);
  const [blogContent, setBlogContent] = useState(content);

  const handlePostSave = (data) => {
    setBlogTitle(data.title);
    setBlogContent(data.body);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    document.title = `${blogTitle}`;
  }, [blogTitle]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <ModalWindow
        isOpen={show}
        onClose={handleClose}
        title={"Edit article"}
        submitLabel={"Save"}
        postTitle={blogTitle}
        postContent={blogContent}
        postExcerpt={excerpt}
      />
      <div className="blog-content__header">
        {date ? (
          <span className="blog-content__date">
            {"Published "}
            <time dateTime={date}>{useDateFormatter(date)}</time>
          </span>
        ) : null}
      </div>
      <h1 className="blog-content__title">{blogTitle}</h1>
      <div className="blog-content__image">
        <img
          className={` ${isImageLoaded ? "loaded" : ""}`}
          src={`/articles/${id}/${image}`}
          alt={title}
          onLoad={handleImageLoad}
        />
      </div>
      <section className="blog-content__section">
        <div
          className="blog-content__content"
          dangerouslySetInnerHTML={{ __html: blogContent }}
        ></div>
      </section>
    </>
  );
});

export default BlogContent;
