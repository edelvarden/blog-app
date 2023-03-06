import { useCallback, useRef } from "react";
import useUndo from '../../hooks/useUndo';
import styles from "./styles.module.scss";

const Button = ({ name, onClick }) => {
    return (
        <button
            type="button"
            className={styles.button}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
        >
            {name}
        </button>
    );
};

const AddPost = ({ onClose, onSave }) => {

    const postContentRef = useRef(null);
    const [postFields, setPostFields] = useUndo({
        postTitle: "",
        postContent: "",
    });

    const handleFieldsChange = useCallback((event) => {
        const { id, value } = event.target;
        setPostFields((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }, []);

    const addContentTag = useCallback((tag) => {
        const postContentEl = postContentRef.current;
        const { selectionStart, selectionEnd } = postContentEl;
        const selectedString = postFields.postContent.slice(selectionStart, selectionEnd);
        if (!selectedString.trim()) return; // nothing is selected or only whitespace is selected

        // create new content based on the tag
        let newContent =
            tag === "ul" || tag === "ol" ? addList(tag, selectedString) : addTag(tag, selectedString);

        // insert the new content
        const startPos = Math.min(selectionStart, selectionEnd);
        postContentEl.setRangeText(newContent, startPos, selectionEnd, 'end');

        // set the caret to the end of the new content
        const newEndPos = startPos + newContent.length;
        postContentEl.setSelectionRange(newEndPos, newEndPos);

        // update state for post content
        setPostFields(prevState => ({
            ...prevState,
            postContent: postContentEl.value
        }));
    },
        [postFields.postContent]
    );

    const addTag = (tag, selectedString) => {
        return `<${tag}>${selectedString}</${tag}>`;
    };

    const addList = (tag, selectedString) => {
        const listItems = selectedString.split("\n").map(item => `<li>${item}</li>`).join("\n");
        return `<${tag}>\n${listItems}\n</${tag}>`;
    };



    const buttonList = [
        { name: "Bold", onClick: () => addContentTag("b") },
        { name: "Italic", onClick: () => addContentTag("i") },
        { name: "Title", onClick: () => addContentTag("h2") },
        { name: "Paragraph", onClick: () => addContentTag("p") },
        { name: "Markered List", onClick: () => addContentTag("ul") },
        { name: "Numbered List", onClick: () => addContentTag("ol") },
    ].map(({ name, onClick }, index) => (
        <Button key={index} name={name} onClick={onClick} />
    ));

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(postFields);
    };

    const formattedContent = postFields.postContent.trim() === '' ? '' : `${postFields.postContent.split('\n').map(line => line.includes('<ol') || line.includes('<ul') || line.includes('<li') || line.includes('</ol>') || line.includes('</ul>') ? line : `<p>${line}</p>`).join('')}`;

    
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
                ref={postContentRef}
                id="postContent"
                className={styles.textarea}
                value={postFields.postContent}
                onChange={handleFieldsChange}
            />
            <div className={styles.textareaButtons}>
                {buttonList}
            </div>
            <button type="submit">Publish</button>

            {postFields.postContent.length > 0 && <h2>Preview:</h2>}
            <div
                className={styles.previewWrapper}
                dangerouslySetInnerHTML={{
                    __html: formattedContent,
                }}
            ></div>
        </form>
    );
}

export default AddPost;
