import Label from "components/FormLabel";
import { textarea } from "./styles.module.scss";
const FormTextArea = ({ labelText, value, onChange }) => (
    <>
        <Label text={labelText} />
        <div>
            <textarea className={textarea} />
        </div>
    </>
);
export default FormTextArea;