import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { ContactsPropsType } from '../../utils/types';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async ({ userId }: { userId: string }, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/contacts/${userId}`);

      return response.data;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editContacts = createAsyncThunk(
  'contacts/editContacts',
  async ({ list, userId }: ContactsPropsType, thunkAPI) => {
    const body = { id: userId, list };

    try {
      const response = await axios.patch(`${BASE_URL}/contacts/${userId}/`, body);

      return response.data;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);
