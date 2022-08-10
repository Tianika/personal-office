import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { BUTTONS } from '../../utils/locales';
import { ContactType } from '../../utils/types';
// import { setLogin } from '../../redux/reducers/SignUpSlice';
// import { loginSelector } from '../../redux/selectors/SignUpSelectors';
import styles from './styles.module.scss';

const Contact = ({ name, phone, address }: ContactType) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [isEdit, setIsEdit] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsEdit(false);
    console.log(data);
  };

  const onEditContact = () => {
    setIsEdit(true);
  };

  const onDeleteContact = () => {
    console.log('delete');
  };

  const cancelEdit = () => {
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
          <input type="button" value={BUTTONS.cancel} onClick={cancelEdit} />
        </form>
      )}
    </div>
  );
};

export default Contact;
