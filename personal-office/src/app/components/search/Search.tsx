import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../redux/hooks/reduxHooks';
import { changeFindContacts } from '../../redux/reducers/ContactsSlice';

import { BUTTONS, PLACEHOLDERS } from '../../utils/locales';
import styles from './styles.module.scss';

const Search = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onReset = () => {
    reset({
      field: '',
    });
    dispatch(changeFindContacts(''));
  };

  const onSubmit: SubmitHandler<FieldValues> = ({ field }) => {
    dispatch(changeFindContacts(field));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          {...register('field', { required: true })}
          placeholder={PLACEHOLDERS.find}
        />
        <input className={styles.button} type="submit" value={BUTTONS.find} />
        <input className={styles.button} type="button" value={BUTTONS.reset} onClick={onReset} />
      </form>
    </div>
  );
};

export default Search;
