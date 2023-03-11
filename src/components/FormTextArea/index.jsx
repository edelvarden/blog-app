import { textarea } from "./styles.module.scss";
import Label from "../FormLabel";
const FormTextArea = ({ labelText, value, onChange }) => (
    <>
        <Label text={labelText} />
        <div>
            <textarea className={textarea} />
        </div>
    </>
);
export default FormTextArea;