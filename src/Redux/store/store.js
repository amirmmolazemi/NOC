import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/darkmodeSlice";
import languageReducer from "../slices/languageSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    user: userReducer,
  },
});

export default store;
