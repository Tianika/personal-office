import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { setLogin, setUserId } from '../../redux/reducers/SignUpSlice';
import { loginSelector } from '../../redux/selectors/SignUpSelectors';
import { localStorageKeys, RoutersMap } from '../../utils/constants';
import { TITLES } from '../../utils/locales';
import styles from './styles.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = useAppSelector(loginSelector);

  const onClick = () => {
    localStorage.removeItem(localStorageKeys.login);
    dispatch(setLogin(''));
    dispatch(setUserId(''));

    navigate(RoutersMap.welcome);
  };

  return (
    <header className={styles.header}>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.logo} />
            <h1 className={styles.title}>{TITLES.header}</h1>
          </div>
          {Boolean(login) && (
            <div className={styles.right}>
              <div className={styles.user}>{login}</div>
              <input className={styles.exit} type="button" onClick={onClick} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
