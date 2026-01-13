import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "@/api";

export const joinByCode = createAsyncThunk(
  'dormitory/joinByCode',
  async (bodyData, { rejectWithValue }) => {
    try {
      const { data } = await $api.post('/dormitory/join', bodyData);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const createDormitory = createAsyncThunk(
  'dormitory/createDormitory',
  async (bodyData, { rejectWithValue }) => {
    try {
      const { data } = await $api.post('/dormitory/create', bodyData);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);