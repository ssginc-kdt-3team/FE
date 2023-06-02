import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { loadState, saveState } from '../store/lib/storage';
// project import
import persistedReducer from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
store.subscribe(() => {
    saveState(store.getState()); // 상태 변경 시 localStorage에 저장
  });

const persistor = persistStore(store);

export { store, persistor };

// import { configureStore } from '@reduxjs/toolkit';

// // project import
// import reducers from './reducers';

// // ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

// const store = configureStore({
//     reducer: reducers
// });

// const { dispatch } = store;

// export { store, dispatch };