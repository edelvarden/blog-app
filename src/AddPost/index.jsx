import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";

function AddPost() {
    const [postFields, setPostFields] = useState({
        postTitle: '',
        postContent: ''
    });

    const [undoStack, setUndoStack] = useState([]);

    const saveToUndoStack = useCallback((content) => {
        setUndoStack(prevState => [...prevState, content]);
    }, [setUndoStack]);

    const handleUndo = (event) => {
        if (
            event.ctrlKey &&
            event.key.toLowerCase() === 'z' &&
            undoStack.length > 0
        ) {
            setPostFields(prevState => ({
                ...prevState,
                postContent: undoStack.pop()
            }));
            setUndoStack([...undoStack]);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleUndo);
        return () => {
            document.removeEventListener('keydown', handleUndo);
        }
    }, [handleUndo]);

    const handleFieldsChange = (event) => {
        const { id, value } = event.target;
        setPostFields(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const addContentTag = tag => {
        const { selectionStart, selectionEnd } = document.getElementById('postContent');
        const selectedString = postFields.postContent.slice(selectionStart, selectionEnd);
        if (selectedString.length > 0) {
            const boldString = `<${tag}>${selectedString}</${tag}>`;
            const newContent = `${postFields.postContent.slice(0, selectionStart)}${boldString}${postFields.postContent.slice(selectionEnd, postFields.postContent.length)}`;
            saveToUndoStack(postFields.postContent);
            setPostFields(prevState => ({
                ...prevState,
                postContent: newContent
            }));
        }
    }

    const addContentList = tag => {
        const { selectionStart, selectionEnd } = document.getElementById('postContent');
        const selectedString = postFields.postContent.slice(selectionStart, selectionEnd);
        if (selectedString.length > 0) {
            const boldString = `<${tag}>\n${selectedString.split('\n')
                .map(item => `<li>${item}</li>`)
                .join('\n')
                }\n</${tag}>`;
            const newContent = `${postFields.postContent.slice(0, selectionStart)}${boldString}${postFields.postContent.slice(selectionEnd, postFields.postContent.length)}`;
            saveToUndoStack(postFields.postContent);
            setPostFields(prevState => ({
                ...prevState,
                postContent: newContent
            }));
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        // Code to submit the blog post to a server or database
    }

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
            <button className={styles.button} type="button" onMouseDown={handleButtonMouseDown} onClick={() => addContentList('ul')}>
                Markered List
            </button>
            <button className={styles.button} type="button" onMouseDown={handleButtonMouseDown} onClick={() => addContentList('ol')}>
                Numbered List
            </button>

            <button type="submit">Publish</button>

            <h2>Preview:</h2>
            <div dangerouslySetInnerHTML={{ __html: `<p>${postFields.postTitle}</p>${postFields.postContent}` }}></div>
        </form>
    );
}

export default AddPost;
