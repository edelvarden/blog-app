import { textarea } from "./styles.module.scss";
const FormTextArea = ({ value, onChange }) => (
    <>
        <div>
            <textarea className={textarea} />
        </div>
    </>
);
export default FormTextArea;