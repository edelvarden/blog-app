import { submit } from "./styles.module.scss";
const FormButton = ({ text, type = 'submit', onClick }) => (
  <button className={submit} type={type} onClick={onClick}>
    {text}
  </button>
);
export default FormButton;