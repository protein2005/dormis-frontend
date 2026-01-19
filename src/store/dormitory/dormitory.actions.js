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

export const getDormitoryById = createAsyncThunk(
  'dormitory/getById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/dormitory/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getDormitoryMembers = createAsyncThunk(
  'dormitory/getMembers',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/dormitory/${id}/members`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateMemberRole = createAsyncThunk(
  'dormitory/updateMember',
  async ({ dormId, membershipId, role, status }, { rejectWithValue }) => {
    try {
      const { data } = await $api.patch(`/dormitory/${dormId}/members`, {
        membershipId,
        role,
        status
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateSettlementSettings = createAsyncThunk(
  'dormitory/updateSettlementSettings',
  async ({ id, settlementFields }, { rejectWithValue }) => {
    try {
      const { data } = await $api.patch(`/dormitory/${id}/settlement-settings`, { settlementFields });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const submitSettlement = createAsyncThunk(
  'dormitory/submitSettlement',
  async ({ dormId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await $api.post(`/dormitory/${dormId}/settlement-submit`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);