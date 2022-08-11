import { createSelector } from 'reselect';
import { RootState } from '../store/store';

export const contactsSelector = (state: RootState) => {
  return state.contacts.contacts;
};

export const isLoadingSelector = (state: RootState) => {
  return state.contacts.isLoading;
};

export const findContactsSelector = (state: RootState) => {
  return state.contacts.findContacts;
};

export const filterContactsSelector = createSelector(
  contactsSelector,
  findContactsSelector,
  (value1, value2) => {
    if (!value2) return value1;

    return value1.filter((contact) => {
      return Object.values(contact).some((value) => {
        return value.toLowerCase().includes(value2.toLowerCase());
      });
    });
  }
);
