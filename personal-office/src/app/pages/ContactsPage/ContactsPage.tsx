import { useEffect } from 'react';
import Contact from '../../components/contact/Contact';
import Loading from '../../components/loading/Loading';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { contactsSelector, isLoadingSelector } from '../../redux/selectors/ContactsSelectors';
import { userIdSelector } from '../../redux/selectors/SignUpSelectors';
import { getContacts } from '../../redux/services/contactsApi';
import { LoadingState } from '../../utils/constants';
import { TITLES } from '../../utils/locales';
import styles from './styles.module.scss';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(contactsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const userId = useAppSelector(userIdSelector);

  useEffect(() => {
    if (userId) {
      dispatch(getContacts({ userId }));
    }
  }, [userId, dispatch]);

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className={styles.container}>
          <h3>{TITLES.contacts}</h3>
          {contacts.length > 0 &&
            contacts.map(({ name, phone, address }) => {
              return (
                <Contact key={name + phone + address} name={name} phone={phone} address={address} />
              );
            })}
          {contacts.length === 0 && <h4>{TITLES.notFound}</h4>}
          {isLoading === LoadingState.Loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
