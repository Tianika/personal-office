import styles from './styles.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.title}>404</div>
      <div className={styles.text}>Not found</div>
    </div>
  );
};

export default NotFoundPage;
