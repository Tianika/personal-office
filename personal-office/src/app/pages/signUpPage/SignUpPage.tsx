import SignUpForm from '../../components/signUpForm/SignUpForm';
import styles from './styles.module.scss';

const SignUpPage = () => {
  return (
    <div className={styles.authorization}>
      <div className="wrapper">
        <div className={styles.container}>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
