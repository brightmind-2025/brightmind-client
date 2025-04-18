import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { courseReducer } from "../features/courseSlice";
import userReducer from "../features/userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

