import AddPost from '../AddPost';
import "./styles.scss";
const CreatePage = () => {
  return (
    <>
      <div className="create__container">
        <h1 className='create__title'>Create</h1>
        <AddPost />
      </div>
    </>
  );
}

export default CreatePage;