import styles from './styles.module.scss';

const Input = ({ label, type, value, onChange, ...props }) => {

  return (
    <>
        <label className={styles.label}>{label}</label>
        <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
        required
      />
    </>
  );
}

export default Input;