import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  meAuth,
  logoutUser
} from "@/store/auth/auth.actions";

const initialState = {
  user: null,
  memberships: [],
  isAuth: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(meAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(meAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.memberships = action.payload.memberships;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(meAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.memberships = [];
        localStorage.removeItem('token');
      })
      .addMatcher(isPending(registerUser, loginUser), (state) => {
        state.isLoading = true;
        state.user = null
        state.error = null;
      }).addMatcher(isFulfilled(registerUser, loginUser), (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken);
        state.error = null;
      }).addMatcher(isRejected(registerUser, loginUser), (state, action) => {
          state.isLoading = false;
          state.user = null;
          state.error = action.payload;
      })
  },
});

export const { actions: authActions } = authSlice;
export default authSlice.reducer;