import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { contactsSelector } from '../../redux/selectors/ContactsSelectors';
import { editContacts } from '../../redux/services/contactsApi';
import { BUTTONS, PLACEHOLDERS } from '../../utils/locales';
import { ContactType } from '../../utils/types';
import styles from './styles.module.scss';

const NewContact = ({ userId }: { userId: string }) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(contactsSelector);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const onReset = () => {
    reset({
      name: '',
      phone: '',
      address: '',
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = ({ name, phone, address }) => {
    const newId = (Number(contacts[contacts.length - 1].contactId) + 1).toString();
    const newContacts: Array<ContactType> = [
      ...contacts,
      {
        contactId: newId,
        name,
        phone,
        address,
      },
    ];

    dispatch(
      editContacts({
        list: newContacts,
        userId,
      })
    );

    onReset();
  };

  return (
    <div className={styles.container}>
      <h4>Добавить контакт: </h4>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          {...register('name', { required: true })}
          placeholder={PLACEHOLDERS.name}
        />
        <input
          className={styles.input}
          type="text"
          {...register('phone', {
            required: true,
          })}
          placeholder={PLACEHOLDERS.phone}
        />
        <input
          className={styles.input}
          type="text"
          {...register('address', {
            required: true,
          })}
          placeholder={PLACEHOLDERS.address}
        />
        <div className={styles.buttons}>
          <input type="submit" value={BUTTONS.create} />
          <input type="button" value={BUTTONS.reset} onClick={onReset} />
        </div>
      </form>
    </div>
  );
};

export default NewContact;
