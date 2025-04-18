// features/user/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "@/types/types";
import { fetchAllUsers } from "@/lib/thunks/userThunks";

interface UserState {
  users: UserDetails[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearStatus(state) {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<UserDetails[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStatus } = userSlice.actions;
export default userSlice.reducer;
