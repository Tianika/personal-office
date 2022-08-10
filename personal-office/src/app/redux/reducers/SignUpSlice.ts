import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from '../../utils/constants';
import { UserData } from '../../utils/types';
import { getUser } from '../services/signUpApi';

type SignUpState = {
  login: string;
  userId: string;
  errorMessage: string;
  isRequestError: boolean;
  isLoading: LoadingState;
};

const initialState: SignUpState = {
  login: '',
  userId: '',
  errorMessage: '',
  isRequestError: false,
  isLoading: LoadingState.Initial,
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
  },
  extraReducers: {
    [getUser.pending.type]: (state) => {
      state.isLoading = LoadingState.Loading;
      state.isRequestError = false;
    },
    [getUser.fulfilled.type]: (state, action: PayloadAction<UserData>) => {
      state.isLoading = LoadingState.Success;

      if (action.payload) {
        const { id, name } = action.payload;

        state.userId = id;
        state.login = name;
      } else {
        state.isRequestError = true;
      }
    },
    [getUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = LoadingState.Error;
      state.errorMessage = action.payload;
    },
  },
});

export const signUpReducer = signUpSlice.reducer;
export const { setLogin } = signUpSlice.actions;
