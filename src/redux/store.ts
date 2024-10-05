import {
  combineReducers,
  configureStore,
  EnhancedStore,
  Reducer,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "@redux/reducers/auth.reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import persistReducer from "redux-persist/es/persistReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  Persistor,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import logoutReducer from "./reducers/logout.reducer";
import headerReducer from "./reducers/header.reducer";
import savingPlanReducer from "./reducers/savingPlan.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const combined: Reducer = combineReducers({
  authUser: authReducer,
  logout: logoutReducer,
  header: headerReducer,
  savingPlans: savingPlanReducer,
});

export const rootReducers: Reducer<RootState> = (state, action) => {
  // reset state to default when user logs out
  if (action.type === "logout/logout") {
    state = {} as RootState;
  }
  return combined(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store: EnhancedStore = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // fix RTK query error
    }),
});

export const persistor: Persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
