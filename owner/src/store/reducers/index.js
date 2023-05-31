// third-party
import { combineReducers } from 'redux';
// import { persistStore } from 'redux-persist';
// import { configureStore } from '@reduxjs/toolkit';
// import persistReducer from 'redux-persist/es/persistReducer';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

// project import
import menu from './menu';
import userSlice  from './userSlice';
import storage from '../lib/storage'
// import authReducer from '../reducers/authReducer'

// ==============================|| COMBINE REDUCERS ||============================== //


const reducers = combineReducers({
     menu,
     user: userSlice.reducer,
     storage
});

export default reducers;


// //persist 설정
// const persistConfig = {
//      key: 'root',
//      storage,
//      whitelist: ['user'] // state를 유지할 reducer
//  }
 

//  // rootReducer를 persist되는 Reduce로 설정
// const persistedReducer = persistReducer(persistConfig)

// export const store = configureStore({
// reducer: persistReducer,
// middeleware: (getDefaultMiddleware) => 
// getDefaultMiddleware({
//      serializableCheck: false,
// }),
// })

// //persistor 생성
// export const persistor = persistStore(store);