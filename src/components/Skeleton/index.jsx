import "./styles.scss";
const Skeleton = ({height}) => {
  return (
    <>
        <div className="skeleton" style={{height: `${height}px `}}></div>
    </>
  );
}

export default Skeleton;