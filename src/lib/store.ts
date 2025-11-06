// src/lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
      // We will add the columns slice here later
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
