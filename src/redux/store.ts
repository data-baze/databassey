import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { baseApi } from "./api-slice/config";
// import chatbotSlice from "./slices/chatbot/chatbotSlice";

const rootReducer = combineReducers({
  // baseApi: baseApi.reducer,
  // chatbot: chatbotSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
