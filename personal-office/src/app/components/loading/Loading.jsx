import styles from './styles.module.scss';

const Loading = () => {
  return (
    <div className={styles.ring}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loading;
