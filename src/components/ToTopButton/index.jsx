import { useEffect, useState } from 'react';
import './styles.scss';

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className="toTopBtn"
      style={{ display: isVisible ? 'block' : 'none' }}
      onClick={handleClick}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};

export default ToTopButton;
