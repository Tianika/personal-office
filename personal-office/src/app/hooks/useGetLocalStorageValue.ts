import { useAppDispatch } from '../redux/hooks/reduxHooks';
import { setLogin, setUserId } from '../redux/reducers/SignUpSlice';
import { localStorageKeys } from '../utils/constants';

export const useGetLocalStorageValue = () => {
  const dispatch = useAppDispatch();
  const login = localStorage.getItem(localStorageKeys.login);
  const userId = localStorage.getItem(localStorageKeys.userId);

  if (login && userId) {
    dispatch(setLogin(login));
    dispatch(setUserId(userId));
  }
};
