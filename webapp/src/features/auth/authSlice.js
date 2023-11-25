import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: null,
  user: null,
  status: null,
  error: null,
}

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async function(userCredentials) {
//     const response = await fetch(`${BASE_URL}/auth/jwt/create`)

//     const data = await response.json();

//     return data;
//   }
// )

// export const fetchUser = createAsyncThunk(
//   'auth/fetchUser',
//   async function() {
//     const response = await fetch(`${BASE_URL}/auth/jwt/create/`);

//     const data = await response.json();

//     return data;
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access, refresh } = action.payload
      state.accessToken = access
      state.refreshToken = refresh
      state.isAuthenticated = true
      state.user = user
    },
    logOut: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.user = null      
    },
    userLoadedSuccess: (state, action) => {
      state.user = action.user
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

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectCurrentToken = (state) => state.auth.accessToken;