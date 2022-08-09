import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.logo} />
          <div className={styles.exit} />
        </div>
      </div>
    </header>
  );
};

export default Header;
