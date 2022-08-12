import { ButtonsDataType } from '../../utils/types';
import styles from './styles.module.scss';

type ButtonsPropsType = { buttonsData: ButtonsDataType };

const ButtonsForForm = ({ buttonsData }: ButtonsPropsType) => {
  return (
    <div className={styles.buttons}>
      <input type="submit" value={buttonsData.submit.value} onClick={buttonsData.submit.onClick} />
      <input type="button" value={buttonsData.cancel.value} onClick={buttonsData.cancel.onClick} />
    </div>
  );
};

export default ButtonsForForm;
