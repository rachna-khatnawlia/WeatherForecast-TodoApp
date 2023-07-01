import { configureStore } from "@reduxjs/toolkit";
import record from "./reducers/recordReducer";

import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
const middleware = [thunk];

export const store = configureStore(
  {
    reducer: { record },
  },
  applyMiddleware(...middleware)
);
