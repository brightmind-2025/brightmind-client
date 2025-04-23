import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CourseState {
  loading: boolean;
  courseData: unknown;
  error: string | null;
}

const initialState: CourseState = {
  loading: false,
  courseData: null,
  error: null,
};

// Thunks
export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/create-course', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const editCourse = createAsyncThunk(
  'course/editCourse',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/edit-course/${id}`, formData, {
        withCredentials: true,
      });
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getSingleCourse = createAsyncThunk(
  'course/getSingleCourse',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/get-course/${id}`);
      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearCourseData: (state) => {
      state.courseData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courseData = action.payload;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.courseData = action.payload;
      })
      .addCase(getSingleCourse.fulfilled, (state, action) => {
        state.courseData = action.payload;
      });
  },
});

export const { clearCourseData } = courseSlice.actions;
export default courseSlice.reducer;
