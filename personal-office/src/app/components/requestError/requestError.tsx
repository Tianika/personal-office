import styles from './styles.module.scss';

type RequestErrorType = { message: string };

const RequestError = ({ message }: RequestErrorType) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default RequestError;
