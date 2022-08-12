import { KeyboardEvent, ReactNode, useEffect, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import {
  isRequestErrorSelector,
  isLoadingSelector,
  loginSelector,
  userIdSelector,
  errorMessageSelector,
} from '../../redux/selectors/SignUpSelectors';
import { getUser } from '../../redux/services/signUpApi';
import { LoadingState, localStorageKeys, RoutersMap } from '../../utils/constants';
import { BUTTONS, ERRORS, PLACEHOLDERS, TITLES } from '../../utils/locales';
import Loading from '../loading/Loading';
import RequestError from '../requestError/requestError';
import styles from './styles.module.scss';

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isRequestError = useAppSelector(isRequestErrorSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const name = useAppSelector(loginSelector);
  const userId = useAppSelector(userIdSelector);
  const requestError = useAppSelector(errorMessageSelector);

  const [isDisable, setIsDisable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<FieldValues> = ({ login, password }) => {
    dispatch(getUser({ login, password }));
  };

  const onKeyDown = (keyPress: KeyboardEvent<HTMLDivElement>) => {
    if (keyPress.key === 'Enter') {
      handleSubmit(onSubmit);
    }
  };

  useEffect(() => {
    if (name && userId) {
      localStorage.setItem(localStorageKeys.login, name);
      localStorage.setItem(localStorageKeys.userId, userId);
      navigate(RoutersMap.contacts);
    }
  }, [name, userId, navigate]);

  useEffect(() => {
    setIsDisable(isLoading === LoadingState.Loading);
  }, [isLoading]);

  return (
    <>
      <h3 className={styles.header}>{TITLES.signUp}</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('login', { required: { value: true, message: ERRORS.name } })}
          className={styles.input}
          placeholder={PLACEHOLDERS.name}
        />
        <input
          type="text"
          {...register('password', {
            required: { value: true, message: ERRORS.password },
          })}
          className={styles.input}
          placeholder={PLACEHOLDERS.password}
        />
        <input
          type="submit"
          value={BUTTONS.submit}
          className={styles.button}
          onKeyDown={onKeyDown}
          disabled={isDisable}
        />
        {isLoading === LoadingState.Loading && <Loading />}
        {requestError && <RequestError message={requestError} />}
        {errors.login && <p>{errors.login.message as ReactNode}</p>}
        {errors.password && <p>{errors.password.message as ReactNode}</p>}
        {isRequestError && <p>{ERRORS.request}</p>}
      </form>
    </>
  );
};

export default SignUpForm;
