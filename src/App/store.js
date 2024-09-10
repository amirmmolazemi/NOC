import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "feature/darkmode/darkmodeSlice";
import languageReducer from "feature/language/languageSlice";
import userReducer from "feature/userRole/userSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    user: userReducer,
  },
});

export default store;
