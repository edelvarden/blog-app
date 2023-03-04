import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";

function AddPost() {
  // state variables using useState and ES6 destructuring
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  
  // useCallback to prevent unnecessary re-renders (memoization)
  const saveToUndoStack = useCallback(
    (content) => {
      setUndoStack((prevState) => [...prevState, content]);
    },
    [setUndoStack]
  );
  
  const handleUndo = useCallback(
    (event) => {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "z" &&
        undoStack.length > 0
      ) {
        setPostContent(undoStack.pop());
        setUndoStack([...undoStack]); // force re-render since we're modifying the state directly
      }
    },
    [undoStack]
  );
  
  useEffect(() => {
    document.addEventListener("keydown", handleUndo);
    return () => {
      document.removeEventListener("keydown", handleUndo);
    };
  }, [handleUndo]);
  
  const handleTitleChange = event => {
    setPostTitle(event.target.value);
  }
  
  const handleContentChange = event => {
    setPostContent(event.target.value);
  }
  
  // addTag function
  const addTag = tag => {
    const selectionStart = document.getElementById("postContent").selectionStart;
    const selectionEnd = document.getElementById("postContent").selectionEnd;
    const selectedString = postContent.slice(selectionStart, selectionEnd);

    if (selectedString.length > 0) {
      const boldString = `<${tag}>${selectedString}</${tag}>`;
      const newContent =
        postContent.slice(0, selectionStart) +
        boldString +
        postContent.slice(selectionEnd, postContent.length);
      saveToUndoStack(postContent);
      setPostContent(newContent);
    }
  };

  // addList function with ES6 arrow function and template literals 
  const addList = tag => {
    const selectionStart = document.getElementById("postContent").selectionStart;
    const selectionEnd = document.getElementById("postContent").selectionEnd;
    const selectedString = postContent.slice(selectionStart, selectionEnd);

    if (selectedString.length > 0) {
      const boldString = `<${tag}>\n${
        selectedString.split("\n").map(item => `<li>${item}</li>`).join("\n")
      }\n</${tag}>`;
      const newContent =
        postContent.slice(0, selectionStart) +
        boldString +
        postContent.slice(selectionEnd, postContent.length);
      saveToUndoStack(postContent);
      setPostContent(newContent);
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
    // Code to submit the blog post to a server or database
  }


    return (
        <form onSubmit={handleSubmit}>
            <label className={styles.label}>Title</label>
            <input
                className={styles.input}
                type="text"
                id="postTitle"
                value={postTitle}
                onChange={handleTitleChange}
                required
            />
            <label className={styles.label}>Content</label>
            <textarea
                className={styles.textarea}
                id="postContent"
                value={postContent}
                onChange={handleContentChange}
            />
            <button className={styles.button} type="button" onClick={() => addTag("b")}>
                Bold
            </button>
            <button className={styles.button} type="button" onClick={() => addTag("i")}>
                Italic
            </button>
            <button className={styles.button} type="button" onClick={() => addTag("h2")}>
                Title
            </button>
            <button className={styles.button} type="button" onClick={() => addList("ul")}>
                Markered List
            </button>
            <button className={styles.button} type="button" onClick={() => addList("ol")}>
                Numbered List
            </button>
            <button type="submit">Publish</button>
            <h2>Preview:</h2>
            <div dangerouslySetInnerHTML={{ __html: `<h1>${postTitle}</h1> ${postContent}` }}></div>
        </form>
    );
}

export default AddPost;
