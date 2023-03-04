import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";

const initialState = {
    postTitle: "",
    postContent: ""
};

const AddPost = ({ onClose, onSave }) => {
    const [postFields, setPostFields] = useState(initialState);
    const [undoStack, setUndoStack] = useState([]);


    // handle undo keystroke (ctrl + z)
    const handleUndo = useCallback((event) => {
        if (event.ctrlKey && event.key.toLowerCase() === "z" && undoStack.length > 0) {
            setPostFields((prevState) => ({
                ...prevState,
                postContent: undoStack[undoStack.length - 1]
            }));
            setUndoStack((prevState) => {
                const copy = [...prevState];
                copy.pop();
                return copy;
            });
        }
    }, [undoStack]);

    useEffect(() => {
        document.addEventListener("keydown", handleUndo);
        return () => {
            document.removeEventListener("keydown", handleUndo);
        };
    }, [handleUndo]);

    // handle content field input changes
    const handleFieldsChange = useCallback((event) => {
        const { id, value } = event.target;
        setPostFields((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }, []);

    // push current post content to undo stack
    const saveToUndoStack = useCallback((content) => {
        setUndoStack((prevState) => [...prevState, content]);
    }, []);

    // handle adding a content tag to the post
    const addContentTag = useCallback((tag) => {
        const postContentEl = document.getElementById("postContent");
        const { selectionStart, selectionEnd } = postContentEl;
        const selectedString = postFields.postContent.slice(selectionStart, selectionEnd);

        if (selectedString.length > 0) {
            const newContent = `${postFields.postContent.slice(0, selectionStart)}<${tag}>${selectedString}</${tag}>${postFields.postContent.slice(selectionEnd)}`;

            saveToUndoStack(postFields.postContent);

            setPostFields(prevState => ({
                ...prevState,
                postContent: newContent
            }));
        }
    }, [postFields.postContent, saveToUndoStack]);

    // handle adding a content list to the post
    const addContentList = useCallback((tag) => {
        const postContentEl = document.getElementById("postContent");
        const { selectionStart, selectionEnd } = postContentEl;
        const selectedString = postFields.postContent.slice(selectionStart, selectionEnd);

        if (selectedString.length > 0) {
            const listItems = selectedString.split("\n").map(item => `<li>${item}</li>`).join("\n");
            const newContent = `${postFields.postContent.slice(0, selectionStart)}<${tag}>\n${listItems}\n</${tag}>${postFields.postContent.slice(selectionEnd)}`

            saveToUndoStack(postFields.postContent);

            setPostFields(prevState => ({
                ...prevState,
                postContent: newContent
            }));
        }
    }, [postFields.postContent, saveToUndoStack]);


    // copy selected text to next string when holding down ctrl + d
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key.toLowerCase() === "d") {
                const postContentEl = document.getElementById('postContent');
                const { selectionStart, selectionEnd } = postContentEl;
                const selectedString = postFields.postContent.slice(selectionStart, selectionEnd);
                if (selectedString.length > 0) {
                    const newContent = `${postFields.postContent.slice(0, selectionEnd)}\n${selectedString}${postFields.postContent.slice(selectionEnd)}`;
                    setPostFields((prevState) => ({
                        ...prevState,
                        postContent: newContent,
                    }));
                }
                event.preventDefault();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [postFields.postContent]);



    const handleSubmit = () => {
        onSave({
            postTitle,
            postContent,
        });
        setPostTitle('');
        setPostContent('');
    };

    const handleButtonMouseDown = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className={styles.label}>Title</label>
            <input
                className={styles.input}
                type="text"
                id="postTitle"
                value={postFields.postTitle}
                onChange={handleFieldsChange}
                required />
            <label className={styles.label}>Content</label>
            <textarea
                id="postContent"
                className={styles.textarea}
                value={postFields.postContent}
                onChange={handleFieldsChange}
            />
            <button className={styles.button} type="button" onMouseDown={handleButtonMouseDown} onClick={() => addContentTag('b')}>
                Bold
            </button>
            <button className={styles.button} type="button" onMouseDown={handleButtonMouseDown} onClick={() => addContentTag('i')}>
                Italic
            </button>
            <button className={styles.button} type="button" onMouseDown={handleButtonMouseDown} onClick={() => addContentTag('h2')}>
                Title
            </button>
            <button className={styles.button} type="button" onMouseDown={handleButtonMouseDown} onClick={() => addContentTag('p')}>
                Paragraph
            </button>
            <button className={styles.button} type="button" onMouseDown={handleButtonMouseDown} onClick={() => addContentList('ul')}>
                Markered List
            </button>
            <button className={styles.button} type="button" onMouseDown={handleButtonMouseDown} onClick={() => addContentList('ol')}>
                Numbered List
            </button>

            <button type="submit">Publish</button>

            {postFields.postContent.length > 0 && <h2>Preview:</h2>}
            <div dangerouslySetInnerHTML={{ __html: `<p>${postFields.postTitle}</p>${postFields.postContent}` }}></div>
        </form>
    );
}

export default AddPost;
