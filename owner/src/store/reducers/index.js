import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from '../lib/storage';

// project import
import menu from './menu';
import userSlice from './userSlice';
import loginSilce from './loginSilce';

// ==============================|| COMBINE REDUCERS ||============================== //

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'loginstate'], // state to persist
  serialize: true, 
};

const reducers = combineReducers({
  menu,
  user: userSlice.reducer,
  loginstate: loginSilce.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;

// // third-party
// import { combineReducers } from 'redux';

// // project import
// import menu from './menu';
// import userSlice  from './userSlice';
// import storage from '../lib/storage'

// // ==============================|| COMBINE REDUCERS ||============================== //

// const reducers = combineReducers({
//      menu,
//      user: userSlice.reducer,
//      storage
// });

// export default reducers;