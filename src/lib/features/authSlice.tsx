import { createSlice } from "@reduxjs/toolkit";
import { registerUser ,activateUser,logoutUser,loginUser,loadUser ,refreshToken} from "../thunks/authThunks";


const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null as string | null,
  };

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        })
        .addCase(activateUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.token = null;
        })
        .addCase(loadUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
          state.token = action.payload.token;
        });
    },
  });
  
  export default authSlice.reducer;
  