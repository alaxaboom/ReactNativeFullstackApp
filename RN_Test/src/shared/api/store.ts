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
import { userApi, applicationApi, locationApi, authReducer, loanReducer } from "../../entities";

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
  [locationApi.reducerPath]: locationApi.reducer,
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
    }).concat(userApi.middleware, applicationApi.middleware, locationApi.middleware),
  devTools: __DEV__,
});

export const persistor = persistStore(store);
export const resetApiCache = () => {
  store.dispatch(userApi.util.resetApiState());
  store.dispatch(applicationApi.util.resetApiState());
  store.dispatch(locationApi.util.resetApiState());
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

