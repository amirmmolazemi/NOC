import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/darkmodeSlice";
import languageReducer from "../slices/languageSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
});

export default store;
