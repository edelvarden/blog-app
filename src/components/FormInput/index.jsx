import Label from "../FormLabel";
import { input } from "./styles.module.scss";

const Input = ({ id, value, onChange, required }) => (
  <input
    className={input}
    type="text"
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    autoComplete="off"
  />
);


const FormInput = ({ labelText, inputId, value, onChange, required = false }) => (
  <>
    <Label text={labelText} />
    <Input id={inputId} value={value} onChange={e => onChange(e.target.value)} required={required} />
  </>
);

export default FormInput;