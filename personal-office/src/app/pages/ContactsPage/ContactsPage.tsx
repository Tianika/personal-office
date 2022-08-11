import { useEffect } from 'react';
import Contact from '../../components/contact/Contact';
import Loading from '../../components/loading/Loading';
import NewContact from '../../components/newContact/NewContact';
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
        <h3 className={styles.title}>{TITLES.contacts}</h3>
        <div className={styles.container}>
          {contacts.length > 0 &&
            contacts.map(({ contactId, name, phone, address }) => {
              return (
                <Contact
                  key={name + phone + address}
                  contactId={contactId}
                  name={name}
                  phone={phone}
                  address={address}
                  userId={userId}
                />
              );
            })}
          {contacts.length === 0 && <h4>{TITLES.notFound}</h4>}
          <NewContact userId={userId} />
          {isLoading === LoadingState.Loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
