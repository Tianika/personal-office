import { RootState } from '../store/store';

export const contactsSelector = (state: RootState) => {
  return state.contacts.contacts;
};

export const isLoadingSelector = (state: RootState) => {
  return state.contacts.isLoading;
};
