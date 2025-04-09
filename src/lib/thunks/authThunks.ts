import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4004/api/user";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

interface ActivationData {
  activation_code: string;
  activation_token: string;
}

export const activateUser = createAsyncThunk<
  unknown,
  ActivationData,
  { rejectValue: unknown }
>("auth/activateUser", async (otpData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/activate-user`, otpData);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return rejectWithValue(err.response.data);
    }
    return rejectWithValue("An unknown error occurred");
  }
});
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }: { rejectWithValue: (value: string) => void }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login-user`, {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${API_URL}/logout-user`);
      return true;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/refresh-token`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user-info`);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
