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

export const getSettlementRequests = createAsyncThunk(
  'dormitory/getRequests',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/dormitory/${id}/requests`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  'dormitory/updateRequestStatus',
  async ({ requestId, status, roomNumber, comment }, { rejectWithValue }) => {
    try {
      const { data } = await $api.patch(`/dormitory/requests/${requestId}/status`, {
        status,
        roomNumber,
        comment
      });
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

export const updateMemberRole = createAsyncThunk(
  'dormitory/updateMember',
  async ({ dormId, membershipId, role }, { rejectWithValue }) => {
    try {
      const { data } = await $api.patch(`/dormitory/${dormId}/members`, {
        membershipId,
        role
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getMySettlementRequests = createAsyncThunk(
  'dormitory/getMyRequests',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $api.get('/dormitory/my-requests');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getDormRooms = createAsyncThunk(
  'dormitory/getRooms',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/dormitory/${id}/rooms`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addRoom = createAsyncThunk(
  'dormitory/addRoom',
  async ({ dormId, roomNumber, capacity, gender, floor }, { rejectWithValue }) => {
    try {
      const { data } = await $api.post(`/dormitory/${dormId}/rooms`, {
        roomNumber,
        capacity,
        gender,
        floor
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAvailableRooms = createAsyncThunk(
  'dormitory/getAvailableRooms',
  async ({ dormId, gender }, { rejectWithValue }) => {
    try {
      const { data } = await $api.get(`/dormitory/${dormId}/rooms/available`, {
        params: { gender }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);