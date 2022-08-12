import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { contactsSelector } from '../../redux/selectors/ContactsSelectors';
import { editContacts } from '../../redux/services/contactsApi';
import { BUTTONS, PLACEHOLDERS } from '../../utils/locales';
import { ButtonsDataType, ContactPropsType, InputsDataType } from '../../utils/types';
import ButtonsForForm from '../buttonsForForm/ButtonsForForm';
import ContactForm from '../contactForm/ContactForm';
import styles from './styles.module.scss';

const Contact = ({ contactId, name, phone, address, userId }: ContactPropsType) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(contactsSelector);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [isEdit, setIsEdit] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newContacts = contacts.map((contact) => {
      return contact.contactId === contactId
        ? { contactId, name: data.name, phone: data.phone, address: data.address }
        : contact;
    });

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
    const newContacts = contacts.filter((contact) => contact.contactId !== contactId);

    dispatch(
      editContacts({
        userId,
        list: newContacts,
      })
    );
  };

  const onReset = () => {
    reset({
      name,
      phone,
      address,
    });
    setIsEdit(false);
  };

  const inputsData: InputsDataType = {
    name: {
      name: 'name',
      value: name,
      placeholder: PLACEHOLDERS.name,
    },
    phone: {
      name: 'phone',
      value: phone,
      placeholder: PLACEHOLDERS.phone,
    },
    address: {
      name: 'address',
      value: address,
      placeholder: PLACEHOLDERS.address,
    },
  };

  const viewButtonsData: ButtonsDataType = {
    submit: {
      value: BUTTONS.edit,
      onClick: onEditContact,
    },
    cancel: {
      value: BUTTONS.delete,
      onClick: onDeleteContact,
    },
  };

  const editButtonsData: ButtonsDataType = {
    submit: {
      value: BUTTONS.confirm,
    },
    cancel: {
      value: BUTTONS.cancel,
      onClick: onReset,
    },
  };

  return (
    <div className="contact-form-container">
      {!isEdit && (
        <>
          <div className={styles.item}>Имя: {name}</div>
          <div className={styles.item}>Телефон: {phone}</div>
          <div className={styles.item}>Адрес: {address}</div>
          <ButtonsForForm buttonsData={viewButtonsData} />
        </>
      )}
      {isEdit && (
        <ContactForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          inputsData={inputsData}
          buttonsData={editButtonsData}
        />
      )}
    </div>
  );
};

export default Contact;
