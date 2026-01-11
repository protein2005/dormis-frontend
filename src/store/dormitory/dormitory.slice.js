import { createSlice } from "@reduxjs/toolkit";
import { joinByCode } from "@/store/dormitory/dormitory.actions";

const initialState = {
  memberships: [],
}

const dormitorySlice = createSlice({
  name: "dormitory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(joinByCode.fulfilled, (state, action) => {
      state.memberships.push(action.payload);
      window.location.href = '/dormitories';
    })
  }
})

export const { actions: dormitoryActions } = dormitorySlice;
export default dormitorySlice.reducer;