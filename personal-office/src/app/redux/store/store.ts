import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { contactsReducer } from '../reducers/ContactsSlice';
import { signUpReducer } from '../reducers/SignUpSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    contacts: contactsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
