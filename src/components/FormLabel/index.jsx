import { label } from "./styles.module.scss";

const Label = ({ children, ...props }) => <label className={label} {...props}>{children}</label>;
export default Label;