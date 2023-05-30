// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import { persistStore } from 'redux-persist';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers
});

const { dispatch } = store;

const persistor = persistStore(store);

export { store, dispatch, persistor  };
