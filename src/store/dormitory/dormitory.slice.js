import { createSlice } from "@reduxjs/toolkit";
import {
  addRoom, getAvailableRooms,
  getDormitoryById,
  getDormitoryMembers, getDormRooms, getMySettlementRequests,
  getSettlementRequests,
  joinByCode, submitSettlement,
  updateMemberRole, updateRequestStatus,
  updateSettlementSettings
} from "@/store/dormitory/dormitory.actions";

const initialState = {
  memberships: [],
  currentDorm: null,
  currentMembers: [],
  currentRequests: [],
  rooms: [],
  availableRooms: [],
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
      })
      .addCase(getSettlementRequests.pending, (state) => { state.isLoading = true; })
      .addCase(getSettlementRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRequests = action.payload;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const index = state.currentRequests.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.currentRequests[index] = action.payload;
        }
        if (action.payload.status === 'approved') {
          const memberIndex = state.currentMembers.findIndex(m => m._id === action.payload.membership);
          if (memberIndex !== -1) {
            state.currentMembers[memberIndex].status = 'active';
            state.currentMembers[memberIndex].roomNumber = action.payload.roomNumber;
          }
        }
      })
      // .addCase(submitSettlement.fulfilled, (state, action) => {
      //   state.currentRequests.push(action.payload);
      //   const dormId = action.payload.dormitory;
      //   const membership = state.memberships.find(m => m.dormitory._id === dormId);
      //   if (membership) {
      //     membership.lastRequest = action.payload;
      //   }
      // })
      .addCase(submitSettlement.fulfilled, (state, action) => {
        const index = state.currentRequests.findIndex(r => r._id === action.payload._id);

        if (index !== -1) {
          state.currentRequests[index] = action.payload;
        } else {
          state.currentRequests.push(action.payload);
        }

        const dormId = action.payload.dormitory;
        const membership = state.memberships.find(m => m.dormitory._id === dormId);
        if (membership) {
          membership.lastRequest = action.payload;
        }
      })
      .addCase(updateSettlementSettings.fulfilled, (state, action) => {
        state.currentDorm = action.payload;
        alert("Налаштування форми успішно збережено!");
      })
      .addCase(getMySettlementRequests.fulfilled, (state, action) => {
        state.currentRequests = action.payload;
      })
      .addCase(getDormRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.isLoading = false;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(getAvailableRooms.fulfilled, (state, action) => {
        state.availableRooms = action.payload;
      })
  }
});

export const { actions: dormitoryActions } = dormitorySlice;
export default dormitorySlice.reducer;