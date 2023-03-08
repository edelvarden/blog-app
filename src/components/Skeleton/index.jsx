import { useMemo } from 'react';
import './styles.scss';

const Skeleton = ({ height }) => {
  const style = useMemo(() => ({ height: typeof +height === "number" ? `${height}px` : height }), [height]);

  return (
    <div className="skeleton" style={style}></div>
  );
};

export default Skeleton;