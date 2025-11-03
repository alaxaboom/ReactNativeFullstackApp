import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userApi, applicationApi } from "./api";
import authReducer from "./authSlice";
import loanReducer from "./loanSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["accessToken", "refreshToken", "isAuthenticated"],
};

const loanPersistConfig = {
  key: "loan",
  storage: AsyncStorage,
  whitelist: ["selectedProduct", "loanAmount", "loanPeriod"],
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [applicationApi.reducerPath]: applicationApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  loan: persistReducer(loanPersistConfig, loanReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware, applicationApi.middleware),
  devTools: __DEV__,
});

export const persistor = persistStore(store);
export const resetApiCache = () => {
  store.dispatch(userApi.util.resetApiState());
  store.dispatch(applicationApi.util.resetApiState());
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;