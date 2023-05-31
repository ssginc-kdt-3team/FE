// third-party
import reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, PERSIST, PURGE } from 'redux-persist';

// project import
import storage from './lib/storage';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //


const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
    //미들웨어 작성시 에러 주의
          getDefaultMiddleware(
              {
                  serializableCheck: {
                      ignoredActions: [PERSIST, PURGE],
                  },
              }
          )
  
  })


//persist 설정
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'] // state를 유지할 reducer
}

const { dispatch } = store;

export const persistor = persistStore(store);
export { store, dispatch };




//persist 설정
// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['user'] // state를 유지할 reducer
// }

// export const store = configureStore({
//     reducer: persistReducer,
//     middeleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware({
//         serializableCheck: false,
//     }),
//     })

// // persistor 생성
// export const persistor = persistStore(store);
// export default store;

// // // rootReducer를 persist되는 Reduce로 설정
// // const persistedReducer = persistReducer(persistConfig)

// // //persistor 생성
// // export const persistor = persistStore(store);
// // const { dispatch } = store;

// // export { store, dispatch };
