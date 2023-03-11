import { useEffect, useState } from 'react';
import useDateFormatter from '../../hooks/useDateFormatter';
import FormButton from '../FormButton';
import PostEditor from '../PostEditor';
import './styles.scss';

const BlogContent = ({ id, title, date, content, image }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [blogTitle, setBlogTitle] = useState(title);
  const [blogContent, setBlogContent] = useState(content);

  const handleEditClick = () => {
    setShowEditor(true);
    document.body.classList.add('edit-mode');
  };

  const handlePostSave = (data) => {
    setBlogTitle(data.title);
    setBlogContent(data.body);
    setShowEditor(false);
    document.body.classList.remove('edit-mode');
  };

  useEffect(() => {
    document.title = `${blogTitle}`;
  }, [blogTitle]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
    <div className={`blog-content ${showEditor ? 'edit' : ''}`}>
      {showEditor && (
        <div className="edit-form">
          <div className="edit-form__overlay" onClick={() => setShowEditor(false)} />
          <div className="edit-form__content">
            <div className="edit-form__container">
              <PostEditor
                blogTitle={blogTitle}
                content={blogContent}
                onSave={handlePostSave}
                onCancel={() => {
                  setShowEditor(false);
                  document.body.classList.remove('edit-mode');
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="blog-content__header">
        {date && (
          <>
            <span className="blog-content__date">
              {'Published '}
              <time dateTime={date}>{useDateFormatter(date)}</time>
            </span>
          </>
        )}
        <FormButton text={'Edit'} onClick={handleEditClick} />
      </div>
      <h1 className="blog-content__title">{blogTitle}</h1>
      <div className="blog-content__image">
        <img
          className={` ${isImageLoaded ? 'loaded' : ''}`}
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
};

export default BlogContent;
