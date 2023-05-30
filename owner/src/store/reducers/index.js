// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import userSlice  from './userSlice';
import storage from '../../lib/storage'

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
     menu,
     user: userSlice.reducer,
     storage
});


export default reducers;
