import { KeyboardEvent, ReactNode, useEffect, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { isRequestErrorSelector, isLoginSelector } from '../../redux/selectors/SignUpSelectors';
import { getUser } from '../../redux/services/signUpApi';
import { RoutersMap } from '../../utils/constants';
import { ERRORS, PLACEHOLDERS } from '../../utils/locales';
import styles from './styles.module.scss';

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const isRequestError = useAppSelector(isRequestErrorSelector);
  const isLogin = useAppSelector(isLoginSelector);

  const navigate = useNavigate();
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
    if (isLogin) {
      navigate(RoutersMap.contacts);
    }
  });

  return (
    <>
      <h3 className={styles.header}>Авторизация</h3>
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
          value={PLACEHOLDERS.submit}
          className={styles.button}
          onKeyDown={onKeyDown}
        />
        {errors.login && <p>{errors.login.message as ReactNode}</p>}
        {errors.password && <p>{errors.password.message as ReactNode}</p>}
        {isRequestError && <p>{ERRORS.request}</p>}
      </form>
    </>
  );
};

export default SignUpForm;
