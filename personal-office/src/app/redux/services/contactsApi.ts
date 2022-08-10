import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

export const getContacts = createAsyncThunk(
  'contacts',
  async ({ userId }: { userId: string }, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/contacts/${userId}`);

      return response.data;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);
