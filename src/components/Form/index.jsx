import {form} from "./styles.module.scss";
const Form = ({ onSubmit, children }) => (
    <form className={form} onSubmit={onSubmit}>
      {children}
    </form>
  );
  export default Form ;