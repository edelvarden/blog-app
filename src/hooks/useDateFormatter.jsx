import { useEffect, useState } from "react";

export const useDateFormatter = initialDate => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatDate = date => {
      const dateObj = new Date(date);
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return dateObj.toLocaleDateString("en-US", options);
    };

    if (initialDate !== formattedDate) {
      setFormattedDate(formatDate(initialDate));
    }
  }, [initialDate]);

  return formattedDate;
};

export default date => useDateFormatter(date);
