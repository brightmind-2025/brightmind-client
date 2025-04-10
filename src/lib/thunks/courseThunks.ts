import { Course } from "@/types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


const API_URL = "http://localhost:4004/api/course";

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
        if (error instanceof axios.AxiosError && error.response) {
          return rejectWithValue(error.response.data?.message || error.message);
        }
        return rejectWithValue("failed to fetch course data");
      }
    }
  );