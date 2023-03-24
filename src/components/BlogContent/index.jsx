import ModalWindow from "components/ModalWindow";
import useDateFormatter from "hooks/useDateFormatter";
import { memo, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./styles.scss";

const BlogContent = memo(({ id, title, date, excerpt, content, image }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [postImage, setPostImage] = useState(`/articles/${id}/${image}`);
  const [postTitle, setPostTitle] = useState(title);
  const [postExcerpt, setPostExcerpt] = useState(excerpt);
  const [postContent, setPostContent] = useState(content);
  const [show, setShow] = useState(false);

  const handlePostSave = (data) => {
    if (data.title.length > 10 && data.excerpt.length > 10 && data.content.length > 30) {
      setPostImage(data.image);
      setPostTitle(data.title);
      setPostExcerpt(data.excerpt);
      setPostContent(data.content);
      setShow(false);
      console.log(postTitle);
      console.log(postContent);
    }
  };

  const handleImageLoad = () => setIsImageLoaded(true);

  useEffect(() => {
    document.title = `${postTitle}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [postTitle]);

  return (
    <Container style={{ maxWidth: "728px" }}>
      <div className="d-flex justify-content-between align-items-center">

        {date && (
          <span className="blog-content__date">
            Published <time dateTime={date}>{useDateFormatter(date)}</time>
          </span>
        )}


        <Button variant="primary" onClick={() => setShow(true)}>
          Edit
        </Button>

      </div>
      <ModalWindow
        isOpen={show}
        onClose={() => setShow(false)}
        title="Edit article"
        submitLabel="Save"
        postImage={postImage}
        postTitle={postTitle}
        postContent={postContent}
        postExcerpt={postExcerpt}
        onSubmit={handlePostSave}
      />
      <section className="blog-content__section">
        <Row className="justify-content-center">
          <Col>
            <h1 className="blog-content__title">{postTitle}</h1>
            <div className="blog-content__image">
              <img
                className={` ${isImageLoaded ? "loaded" : ""}`}
                src={postImage}
                alt={postTitle}
                onLoad={handleImageLoad}
              />
            </div>
            <div
              className="blog-content__content"
              dangerouslySetInnerHTML={{ __html: postContent }}
            />
          </Col>
        </Row>
      </section>
    </Container>
  );
});

export default BlogContent;
