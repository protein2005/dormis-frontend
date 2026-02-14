import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "@/api";

export const registerUser = createAsyncThunk(
  'auth/register',
  async (bodyData, { rejectWithValue }) => {
    try {
      const { data } = await $api.post('/auth/register', bodyData);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (bodyData, { rejectWithValue }) => {
    try {
      const { data } = await $api.post('/auth/login', bodyData);
      return data
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const meAuth = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $api.get('/auth/me');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await $api.post('/auth/logout');
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updateData, { rejectWithValue }) => {
    try {
      const { data } = await $api.patch('/user/profile', updateData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);