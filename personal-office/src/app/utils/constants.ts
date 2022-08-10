export const RoutersMap = {
  welcome: '',
  contacts: '/contacts',
  notFound: '*',
};

export const BASE_URL = 'http://localhost:3001';

export enum LoadingState {
  Initial = 'Initial',
  Loading = 'loading',
  Success = 'success',
  Error = 'Error',
}

export const localStorageKeys = {
  login: 'loginPersonalOffice',
};
