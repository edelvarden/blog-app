import styles from './styles.module.scss';

const TextArea = ({ label, value, onChange, children, ...props }) => {

  return (
    <>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.textarea} value={value} onChange={onChange} {...props}>{children}</textarea>
    </>
  );
}

export default TextArea; 