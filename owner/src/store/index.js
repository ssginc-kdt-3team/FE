// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import ownerReducer from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers
});

const { dispatch } = store;

export { store, dispatch };
