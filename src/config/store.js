import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

import logger from "redux-logger";
import contestReducer from "./contestReducer";

export default configureStore({
  reducer: {
    userState: userReducer,
    contestState: contestReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
