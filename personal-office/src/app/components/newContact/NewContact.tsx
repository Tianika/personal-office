import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { contactsSelector } from '../../redux/selectors/ContactsSelectors';
import { editContacts } from '../../redux/services/contactsApi';
import { BUTTONS, PLACEHOLDERS, TITLES } from '../../utils/locales';
import { ButtonsDataType, ContactType, InputsDataType } from '../../utils/types';
import ContactForm from '../contactForm/ContactForm';
import styles from './styles.module.scss';

type NewContactPropsType = { userId: string };

const inputsData: InputsDataType = {
  name: {
    name: 'name',
    value: '',
    placeholder: PLACEHOLDERS.name,
  },
  phone: {
    name: 'phone',
    value: '',
    placeholder: PLACEHOLDERS.phone,
  },
  address: {
    name: 'address',
    value: '',
    placeholder: PLACEHOLDERS.address,
  },
};

const NewContact = ({ userId }: NewContactPropsType) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(contactsSelector);

  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onReset = () => {
    reset({
      name: '',
      phone: '',
      address: '',
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = ({ name, phone, address }) => {
    const lastId = contacts.length ? contacts[contacts.length - 1].contactId : '0';
    const newId = (Number(lastId) + 1).toString();
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

  const buttonsData: ButtonsDataType = {
    submit: {
      value: BUTTONS.create,
    },
    cancel: {
      value: BUTTONS.reset,
      onClick: onReset,
    },
  };

  return (
    <div className="contact-form-container">
      <h4 className={styles.title}>{TITLES.addContact}</h4>

      <ContactForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        inputsData={inputsData}
        buttonsData={buttonsData}
      />
    </div>
  );
};

export default NewContact;
