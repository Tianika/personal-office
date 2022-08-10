import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { setLogin } from '../redux/reducers/SignUpSlice';
import { localStorageKeys } from '../utils/constants';

export const useGetLocalStorageValue = () => {
  const dispatch = useAppDispatch();
  const login = localStorage.getItem(localStorageKeys.login);

  if (login) {
    dispatch(setLogin(login));
  }
};
