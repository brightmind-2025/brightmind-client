// import { createSlice } from "@reduxjs/toolkit";
// import { fetchAllCourses, fetchCourseById } from "@/lib/thunks/courseThunks";
// import { Course } from "@/types/types";

// interface CourseState {
//   courses: Course[];
//   currentCourse: Course | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CourseState = {
//   courses: [],
//   currentCourse: null,
//   loading: false,
//   error: null,
// };

// export const courseSlice = createSlice({
//   name: "courses",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // All Courses
//       .addCase(fetchAllCourses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllCourses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courses = action.payload;
//       })
//       .addCase(fetchAllCourses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? null;
//       })
//       .addCase(fetchCourseById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCourseById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentCourse = action.payload;
//       })
//       .addCase(fetchCourseById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) ?? "Failed to fetch course.";
//       });
//   },
  
// });

// export const courseReducer = courseSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllCourses,
  fetchCourseById,
  createCourse,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
  updateCourse,
} from "@/lib/thunks/courseThunks";
import { Course } from "@/types/types";

interface CourseState {
  selectedCourse: Course | null;
  courses: Course[];
  currentCourse: Course | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
  successMessage: null,
  selectedCourse: null
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearStatus(state) {
      state.error = null;
      state.successMessage = null;
    },
    setCourseInfo(state, action: PayloadAction<Partial<Course>>) {
      if (!state.currentCourse) state.currentCourse = {} as Course;
      state.currentCourse = {
        ...state.currentCourse,
        ...action.payload,
      };
    },
  },
  
  extraReducers: (builder) => {
    builder
      // All Courses
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      // Single Course
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch course.";
      })

      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Course created successfully!";
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Course updated successfully!";
        state.currentCourse = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add Question
      .addCase(addQuestion.fulfilled, (state, action) => {
        if (state.currentCourse?.questions) {
          state.currentCourse.questions.push(action.payload);
        }
      })

      // Add Answer
      .addCase(addAnswer.fulfilled, (state, action) => {
        
        if (state.currentCourse?.questions) {
          const question = state.currentCourse.questions.find(
            (q) => q.id === action.payload.questionId
          );
          if (question && question.answers) {
            question.answers.push(action.payload);
          }
        }
      })

      // Add Review
      .addCase(addReview.fulfilled, (state, action) => {
        if (state.currentCourse?.reviews) {
          state.currentCourse.reviews?.push(action.payload);
        }
      })

      .addCase(addReplyToReview.fulfilled, () => {
       
      });
  },
});

export const { clearStatus, setCourseInfo } = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
