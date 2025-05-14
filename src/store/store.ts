import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CustomizerReducer from "./customizer/CustomizerSlice";
import wizardReducer from './wizard/wizardSlice';


const persistConfig = {
  key: "root",
  storage,
  whitelist: ['customizer', 'wizard'],
};

const rootReducer = combineReducers({
  customizer: CustomizerReducer,
  wizard: wizardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
