import { RootState } from '../store/store';

export const loginSelector = (state: RootState) => {
  return state.signUp.login;
};

export const userIdSelector = (state: RootState) => {
  return state.signUp.userId;
};

export const isRequestErrorSelector = (state: RootState) => {
  return state.signUp.isRequestError;
};

export const isLoadingSelector = (state: RootState) => {
  return state.signUp.isLoading;
};
