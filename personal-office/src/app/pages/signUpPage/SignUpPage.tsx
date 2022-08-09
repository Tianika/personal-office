import AuthorizationForm from '../../components/signUpForm/SignUpForm';
import styles from './styles.module.scss';

const SignUpPage = () => {
  return (
    <div className={styles.authorization}>
      <div className="wrapper">
        <div className={styles.container}>
          <AuthorizationForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
