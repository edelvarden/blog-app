import { useState } from "react";
import Input from "../Input";
import TextArea from "../Textarea";
import styles from "./styles.module.scss";

function AddPost() {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    function handleTitleChange(event) {
        setPostTitle(event.target.value);
    }

    function handleContentChange(event) {
        setPostContent(event.target.value);
    }

    const addTag = (tag) => {
        const selectionStart = document.getElementById("postContent").selectionStart;
        const selectionEnd = document.getElementById("postContent").selectionEnd;
        const selectedString = postContent.slice(selectionStart, selectionEnd);

        if (selectedString.length > 0) {
            const boldString = `<${tag}>${selectedString}</${tag}>`;
            const newContent =
                postContent.slice(0, selectionStart) +
                boldString +
                postContent.slice(selectionEnd, postContent.length);
            setPostContent(newContent);
        }
    };

    function addList(tag) {
        const selectionStart = document.getElementById("postContent").selectionStart;
        const selectionEnd = document.getElementById("postContent").selectionEnd;
        const selectedString = postContent.slice(selectionStart, selectionEnd);

        if (selectedString.length > 0) {
            const boldString = `<${tag}>\n${selectedString.split('\n').map(item => `<li>${item}</li>`).join('\n')}\n</${tag}>`;
            const newContent =
                postContent.slice(0, selectionStart) +
                boldString +
                postContent.slice(selectionEnd, postContent.length);
            setPostContent(newContent);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        // Code to submit the blog post to a server or database
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="postTitle"></label>
            <Input
                label="Title:"
                type="text"
                id="postTitle"
                value={postTitle}
                onChange={handleTitleChange}
                placeholder=""
            />
            <label htmlFor="postContent">Content:</label>
            <TextArea
                id="postContent"
                value={postContent}
                onChange={handleContentChange}
            />
            <button className={styles.button} type="button" onClick={() => addTag("b")}>
                Bold
            </button>
            <button className={styles.button} type="button" onClick={() => addTag("h2")}>
                Title (h2)
            </button>
            <button className={styles.button} type="button" onClick={() => addList("ul")}>
                Markered List
            </button>
            <button className={styles.button} type="button" onClick={() => addList("ol")}>
                Numbered List
            </button>
            <button type="submit">Publish</button>
            <div dangerouslySetInnerHTML={{ __html: `<h1>${postTitle}</h1> ${postContent}` }}></div>
        </form>
    );
}

export default AddPost;