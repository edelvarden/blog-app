import useDateFormatter from "hooks/useDateFormatter";
import { memo, useEffect, useState } from "react";
import "./styles.scss";
// Enumerate the different states of the component
const BlogContentState = {
  VIEW: "view",
  EDIT: "edit",
};

const BlogContent = memo(({ id, title, date, excerpt, content, image }) => {
  const [state, setState] = useState(BlogContentState.VIEW);
  const [blogTitle, setBlogTitle] = useState(title);
  const [blogContent, setBlogContent] = useState(content);

  const handlePostSave = (data) => {
    setBlogTitle(data.title);
    setBlogContent(data.body);
    setState(BlogContentState.VIEW);
    document.body.classList.remove("edit-mode");
  };

  const handleCancel = () => {
    setState(BlogContentState.VIEW);
    document.body.classList.remove("edit-mode");
  };

  useEffect(() => {
    document.title = `${blogTitle}`;
  }, [blogTitle]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && state === BlogContentState.EDIT) {
        handleCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, handleCancel]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
    <>
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
