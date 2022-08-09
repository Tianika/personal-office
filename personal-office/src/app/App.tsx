import { Route, Routes } from 'react-router';
import Header from './components/header/Header';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { RoutersMap } from './utils/constats';
import styles from './styles.module.scss';
import './styles/reset.scss';
import './styles/common.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Routes>
          <Route path={RoutersMap.welcome} element={<AuthorizationPage />} />
          <Route path={RoutersMap.contacts} element={<ContactsPage />} />
          <Route path={RoutersMap.notFound} element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
