import { createSlice } from "@reduxjs/toolkit";
import {
  getDormitoryById,
  getDormitoryMembers, joinByCode, updateMemberRole
} from "@/store/dormitory/dormitory.actions";

const initialState = {
  memberships: [],
  currentDorm: null,
  currentMembers: [],
  isLoading: false,
  error: null
}

const dormitorySlice = createSlice({
  name: "dormitory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDormitoryById.pending, (state) => { state.isLoading = true; })
      .addCase(getDormitoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDorm = action.payload;
      })
      .addCase(getDormitoryMembers.fulfilled, (state, action) => {
        state.currentMembers = action.payload;
      })
      .addCase(updateMemberRole.fulfilled, (state, action) => {
        const index = state.currentMembers.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.currentMembers[index] = action.payload;
        }
      })
      .addCase(joinByCode.fulfilled, (state, action) => {
        state.memberships.push(action.payload);
        window.location.href = '/dormitories';
      });
  }
});

export const { actions: dormitoryActions } = dormitorySlice;
export default dormitorySlice.reducer;