import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from '../lib/storage';

// project import
import menu from './menu';
import userSlice from './userSlice';
import loginSilce from './loginSilce';
// import shopSlice from './shopslice';

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
  loginstate: loginSilce.reducer,
  // shop: shopSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;

