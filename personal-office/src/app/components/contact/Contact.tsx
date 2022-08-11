import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { contactsSelector } from '../../redux/selectors/ContactsSelectors';
import { editContacts } from '../../redux/services/contactsApi';
import { BUTTONS } from '../../utils/locales';
import { ContactPropsType } from '../../utils/types';
import styles from './styles.module.scss';

const Contact = ({ contactId, name, phone, address, userId }: ContactPropsType) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(contactsSelector);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [isEdit, setIsEdit] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newContacts = contacts.map((contact) => {
      return contact.contactId === contactId
        ? { contactId, name: data.name, phone: data.phone, address: data.address }
        : contact;
    });
    console.log(newContacts);

    setIsEdit(false);
    dispatch(
      editContacts({
        userId,
        list: newContacts,
      })
    );
  };

  const onEditContact = () => {
    setIsEdit(true);
  };

  const onDeleteContact = () => {
    console.log('delete');
  };

  const onCancelEdit = () => {
    reset({
      name,
      phone,
      address,
    });
    setIsEdit(false);
  };

  return (
    <div className={styles.container}>
      {!isEdit && (
        <>
          <div className={styles.data}>
            <div className={styles.item}>Имя: {name}</div>
            <div className={styles.item}>Телефон: {phone}</div>
            <div className={styles.item}>Адрес: {address}</div>
          </div>
          <div className={styles.buttons}>
            <input type="button" value={BUTTONS.edit} onClick={onEditContact} />
            <input type="button" value={BUTTONS.delete} onClick={onDeleteContact} />
          </div>
        </>
      )}
      {isEdit && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.input}
            type="text"
            {...register('name', { required: true })}
            defaultValue={name}
          />
          <input
            className={styles.input}
            type="text"
            {...register('phone', {
              required: true,
            })}
            defaultValue={phone}
          />
          <input
            className={styles.input}
            type="text"
            {...register('address', {
              required: true,
            })}
            defaultValue={address}
          />

          <input type="submit" value={BUTTONS.confirm} />
          <input type="button" value={BUTTONS.cancel} onClick={onCancelEdit} />
        </form>
      )}
    </div>
  );
};

export default Contact;
