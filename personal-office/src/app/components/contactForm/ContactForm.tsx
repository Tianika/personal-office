import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ButtonsDataType, InputsDataType } from '../../utils/types';
import ButtonsForForm from '../buttonsForForm/ButtonsForForm';
import styles from './styles.module.scss';

type ContactFormPropsType = {
  onSubmit: () => void;
  register: UseFormRegister<FieldValues>;
  inputsData: InputsDataType;
  buttonsData: ButtonsDataType;
};

const ContactForm = ({ onSubmit, register, inputsData, buttonsData }: ContactFormPropsType) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {Object.values(inputsData).map(({ name, value, placeholder }) => {
        return (
          <input
            key={name + value}
            className={styles.input}
            type="text"
            {...register(name, { required: true })}
            placeholder={placeholder}
            defaultValue={value}
          />
        );
      })}
      <ButtonsForForm buttonsData={buttonsData} />
    </form>
  );
};

export default ContactForm;
