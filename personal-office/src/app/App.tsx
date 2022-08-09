import { Route, Routes } from 'react-router';
import Header from './components/header/Header';
import SignUpPage from './pages/signUpPage/SignUpPage';
import ContactsPage from './pages/contactsPage/ContactsPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import { RoutersMap } from './utils/constants';
import styles from './styles.module.scss';
import './styles/reset.scss';
import './styles/common.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path={RoutersMap.welcome} element={<SignUpPage />} />
          <Route path={RoutersMap.contacts} element={<ContactsPage />} />
          <Route path={RoutersMap.notFound} element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
