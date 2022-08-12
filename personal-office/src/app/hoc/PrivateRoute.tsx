import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAppSelector } from '../redux/hooks/reduxHooks';
import { RoutersMap } from '../utils/constants';
import { loginSelector } from '../redux/selectors/SignUpSelectors';

type PrivateRouteType = {
  children: ReactElement;
};

const PrivateRoute = ({ children }: PrivateRouteType) => {
  const login = useAppSelector(loginSelector);

  return !login ? <Navigate to={RoutersMap.welcome} replace /> : children;
};

export default PrivateRoute;
