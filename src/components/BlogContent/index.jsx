import { useEffect, useState } from "react";
import useDateFormatter from "../../hooks/useDateFormatter";
import FormButton from "../FormButton";
import PostEditor from "../PostEditor";
import "./styles.scss";

// Enumerate the different states of the component
const BlogContentState = {
  VIEW: "view",
  EDIT: "edit",
};

const BlogContent = React.memo(({ id, title, date, content, image }) => {
  const [state, setState] = useState(BlogContentState.VIEW);
  const [blogTitle, setBlogTitle] = useState(title);
  const [blogContent, setBlogContent] = useState(content);

  const handleEditClick = () => {
    setState(BlogContentState.EDIT);
    document.body.classList.add("edit-mode");
  };

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
  });

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
    <div className={`blog-content ${state === BlogContentState.EDIT ? "edit" : ""}`}>
      {state === BlogContentState.EDIT && (
        <div className="edit-form">
          <div className="edit-form__overlay" onClick={handleCancel} />
          <div className="edit-form__content">
            <div className="edit-form__container">
              <PostEditor
                blogTitle={blogTitle}
                content={blogContent}
                onSave={handlePostSave}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </div>
      )}
      <div className="blog-content__header">
        {date && (
          <>
            <span className="blog-content__date">
              {"Published "}
              <time dateTime={date}>{useDateFormatter(date)}</time>
            </span>
          </>
        )}
        <FormButton text={"Edit"} onClick={handleEditClick} />
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
    </div>
  );
});

export default BlogContent;
