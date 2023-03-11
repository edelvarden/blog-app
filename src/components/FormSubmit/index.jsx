import {submit} from "./styles.module.scss";
const SubmitButton = ({ text }) => (
    <button className={submit} type='submit'>
      {text}
    </button>
  );
  export default SubmitButton;