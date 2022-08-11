import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from '../../utils/constants';
import { ContactType, ContactsType } from '../../utils/types';
import { editContacts, getContacts } from '../services/contactsApi';

type ContactsState = {
  contacts: Array<ContactType>;
  findContacts: string;
  errorMessage: string;
  isRequestError: boolean;
  isLoading: LoadingState;
};

const initialState: ContactsState = {
  contacts: [],
  findContacts: '',
  errorMessage: '',
  isRequestError: false,
  isLoading: LoadingState.Initial,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeFindContacts(state, action: PayloadAction<string>) {
      state.findContacts = action.payload;
    },
  },
  extraReducers: {
    [getContacts.pending.type]: (state) => {
      state.isLoading = LoadingState.Loading;
      state.isRequestError = false;
    },
    [getContacts.fulfilled.type]: (state, action: PayloadAction<ContactsType>) => {
      state.isLoading = LoadingState.Success;

      if (action.payload) {
        state.contacts = action.payload.list;
      }
    },
    [getContacts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = LoadingState.Error;
      state.errorMessage = action.payload;
    },

    [editContacts.pending.type]: (state) => {
      state.isLoading = LoadingState.Loading;
      state.isRequestError = false;
    },
    [editContacts.fulfilled.type]: (state, action: PayloadAction<ContactsType>) => {
      state.isLoading = LoadingState.Success;

      if (action.payload) {
        state.contacts = action.payload.list;
      }
    },
    [editContacts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = LoadingState.Error;
      state.errorMessage = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { changeFindContacts } = contactsSlice.actions;
