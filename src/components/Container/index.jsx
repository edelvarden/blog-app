import styles from './styles.module.scss';
const Container = ({adaptive, children}) => {
  return (
    <div className={ adaptive ? `${styles.container}` : `${styles.containerFixed}`} >
      {children}
    </div>
  );
}

export default Container;