import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  accessToken: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refresh') || null, //TODO move refresh to httpOnly cookies
  isAuthenticated: null,
  user: null,
  status: null,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload
      localStorage.setItem('token', access)
      localStorage.setItem('refresh', refresh)  //TODO move refresh to httpOnly cookies
      state.accessToken = access
      state.refreshToken = refresh
      state.isAuthenticated = true
    },
    logOut: (state) => {
      localStorage.removeItem('token')
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.user = null      
    },
    userLoadedSuccess: (state, action) => {
      console.log('user_loaded', action)
      console.log('state', state)
      state.user = action.payload
    },
    userLoadedFail: (state) => {
      state.user = null
    }
  },
  // extraReducers: {
  //   [fetchUser.pending]: (state) => {
  //     state.status = 'loading';
  //     state.error = null;
  //   },
  //   [fetchUser.fulfilled]: (state, action) => {
  //     state.status = 'downloaded';
  //     state.user = action.payload;
  //   },
  //   [fetchUser.rejected]: (state, action) => {},

  //   [loginUser.pending]: (state) => {
  //     state.status = 'loading';
  //     state.error = null;
  //   },
  //   [loginUser.fulfilled]: (state, payload) => {
  //     state.status = 'downloaded';
  //     logIn(state, action.payload);
  //   },
  // }
});

export const { setCredentials, logOut, userLoadedSuccess, userLoadedFail } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectCurrentToken = (state) => state.auth.accessToken;