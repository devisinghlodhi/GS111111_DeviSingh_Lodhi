import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { modalReducer } from './reducers/modalreducer';

import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig } from 'redux-persist';

export interface RootState {
  userReducer: ReturnType<typeof userReducer>;
  modalReducer: ReturnType<typeof modalReducer>;
}

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: storage,
  blacklist: ['modalReducer'],
};

export const rootReducers = combineReducers({
  userReducer,
  modalReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export { store };
