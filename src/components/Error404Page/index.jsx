import styles from "./styles.module.scss";
const Error404Page = () => {
    return (
        <>
            <div className={styles.body}>
                <h1>404 - Not Found</h1>
                <p >Sorry, the page you're looking for cannot be found.</p>
            </div>
        </>
    );
};

export default Error404Page;