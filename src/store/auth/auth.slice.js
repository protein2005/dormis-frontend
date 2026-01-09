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
  isAuth: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(meAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
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