import { useCallback, useRef } from "react";
import useUndo from '../../hooks/useUndo';
import styles from "./styles.module.scss";

const AddPost = ({ onClose, onSave }) => {

    const postContentRef = useRef(null);
    const initialState = {
        postTitle: "",
        postContent: "",
    };

    const [postFields, setPostFields] = useUndo(initialState);

    const handleFieldsChange = useCallback((event) => {
        const { id, value } = event.target;
        setPostFields((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }, []);

    const addContentTag = useCallback((tag) => {
        const postContentEl = postContentRef.current;
        const { selectionStart, selectionEnd } = postContentEl;
        const selectedString = postFields.postContent.slice(selectionStart, selectionEnd);
    
        if (selectedString.length > 0) {
            const newContent = `<${tag}>${selectedString}</${tag}>`;
    
            setPostFields(prevState => ({
                ...prevState,
                postContent: `${postFields.postContent.slice(0, selectionStart)}${newContent}${postFields.postContent.slice(selectionEnd)}`
            }));
        }
    }, [postFields.postContent]);

    const addContentList = useCallback((tag) => {
        const postContentEl = postContentRef.current;
        const { selectionStart, selectionEnd } = postContentEl;
        const selectedString = postFields.postContent.slice(selectionStart, selectionEnd);

        if (selectedString.length > 0) {
            const listItems = selectedString.split("\n").map(item => `<li>${item}</li>`).join("\n");
            const newContent = `${postFields.postContent.slice(0, selectionStart)}<${tag}>\n${listItems}\n</${tag}>${postFields.postContent.slice(selectionEnd)}`;

            setPostFields(prevState => ({
                ...prevState,
                postContent: newContent
            }));
        }
    }, [postFields.postContent]);

    const Button = ({ name, onClick }) => {
        const handleMouseDown = (event) => {
            event.preventDefault();
        };
        return (
            <button type="button" className={styles.button} onMouseDown={handleMouseDown} onClick={onClick}>{name}</button>
        );
    };

    const buttonList = [
        { name: 'Bold', onClick: () => addContentTag('b') },
        { name: 'Italic', onClick: () => addContentTag('i') },
        { name: 'Title', onClick: () => addContentTag('h2') },
        { name: 'Paragraph', onClick: () => addContentTag('p') },
        { name: 'Markered List', onClick: () => addContentList('ul') },
        { name: 'Numbered List', onClick: () => addContentList('ol') },
    ].map(({ name, onClick }, index) => (
        <Button key={index} name={name} onClick={onClick} />
    ));

    return (
        <form>
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
                ref={postContentRef}
                id="postContent"
                className={styles.textarea}
                value={postFields.postContent}
                onChange={handleFieldsChange}
            />
            {buttonList}
            <button type="submit">Publish</button>

            {postFields.postContent.length > 0 && <h2>Preview:</h2>}
            <div
                dangerouslySetInnerHTML={{
                    __html: `<p>${postFields.postTitle}</p>${postFields.postContent}`,
                }}
            ></div>
        </form>
    );
}

export default AddPost;
