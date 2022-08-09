import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { SignUpData } from '../../utils/types';

export const getUser = createAsyncThunk(
  'authorization',
  async ({ login, password }: SignUpData, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/users?name=${login}&password=${password}`);

      return response.data[0];
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);
