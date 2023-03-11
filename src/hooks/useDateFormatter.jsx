import { useEffect, useState } from 'react';

export const useDateFormatter = (initialDate) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const formatDate = (d) => {
      const dateObj = new Date(d);
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return dateObj.toLocaleDateString("en-US", options);
    };
    
    setFormattedDate(formatDate(initialDate));
  }, [initialDate]);

  return formattedDate;
};

export default useDateFormatter;