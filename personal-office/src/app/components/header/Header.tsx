import { useNavigate } from 'react-router';
import { RoutersMap } from '../../utils/constants';
import styles from './styles.module.scss';

const Header = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(RoutersMap.welcome);
  };

  return (
    <header className={styles.header}>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.logo} />
          <input className={styles.exit} type="button" onClick={onClick} />
        </div>
      </div>
    </header>
  );
};

export default Header;
