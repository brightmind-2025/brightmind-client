import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Course } from "@/types/types";

const API_URL = "http://localhost:4004/api/course";

// Already implemented:
export const getAllCourses = async () => {
  const response = await axios.get(`${API_URL}/get-all-courses`);
  return response.data.courses;
};

export const fetchAllCourses = createAsyncThunk<Course[]>(
  "courses/fetchAll",
  async () => {
    return await getAllCourses();
  }
);

export const fetchCourseById = createAsyncThunk<Course, string>(
  "courses/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get-course/${id}`);
      const course = response.data.course;

      if (!course || !Array.isArray(course.courseData)) {
        throw new Error("Invalid or missing courseData");
      }

      return course;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || error.message);
      }
      return rejectWithValue("Failed to fetch course data");
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/create-course", formData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, updatedData }: { id: string; updatedData: Course }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/edit-course/${id}`, updatedData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || "Failed to update course");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// 🧠 Add a Question
export const addQuestion = createAsyncThunk(
  "courses/addQuestion",
  async (data: { courseId: string; question: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add-question`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || "Failed to add question");
      }
      return rejectWithValue("Unexpected error adding question");
    }
  }
);

// 🧠 Add an Answer (admin)
export const addAnswer = createAsyncThunk(
  "courses/addAnswer",
  async (data: { courseId: string; questionId: string; answer: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/add-answer`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || "Failed to add answer");
      }
      return rejectWithValue("Unexpected error adding answer");
    }
  }
);

// 🧠 Add Review (user)
export const addReview = createAsyncThunk(
  "courses/addReview",
  async (
    data: { courseId: string; review: string; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/add-review/${data.courseId}`, {
        review: data.review,
        rating: data.rating,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || "Failed to add review");
      }
      return rejectWithValue("Unexpected error adding review");
    }
  }
);

// 🧠 Add Reply to Review (admin)
export const addReplyToReview = createAsyncThunk(
  "courses/addReplyToReview",
  async (
    data: { courseId: string; reviewId: string; reply: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/add-reply`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data || "Failed to reply to review");
      }
      return rejectWithValue("Unexpected error replying to review");
    }
  }
);
