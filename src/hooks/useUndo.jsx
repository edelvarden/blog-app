import { useCallback, useEffect, useState } from "react";

const useUndo = (initialState) => {
  const [content, setContent] = useState(initialState);
  const [undoStack, setUndoStack] = useState([]);

  // handle undo keystroke (ctrl + z)
  const handleUndo = useCallback(
    (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'z' && undoStack.length > 0) {
        setContent(undoStack[undoStack.length - 1]);
        setUndoStack((prevState) => [...prevState.slice(0,-1)]);
      }
    },
    [undoStack]
  );

  // add/remove the event listener for undoing the previous change
  useEffect(() => {
    document.addEventListener("keydown", handleUndo);
    return () => {
      document.removeEventListener("keydown", handleUndo);
    };
  }, [handleUndo]);

  // save current post content to undo stack before it gets changed
  const addToUndoStack = useCallback((newContent) => {
    setUndoStack((prevState) => [...prevState, content]);
    setContent(newContent);
  }, [content]);

  return [content, addToUndoStack];
};

export default useUndo;