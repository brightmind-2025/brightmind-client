
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserDetails } from "@/types/types";


const API_URL = "http://localhost:4004/api/user";
export const fetchAllUsers = createAsyncThunk<UserDetails[]>(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/get-all-users`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data?.message || "Failed to fetch users");
      }
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  }
);
