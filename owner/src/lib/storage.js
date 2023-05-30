import { createSlice } from '@reduxjs/toolkit';

const storageInitialState  = {
  isLoggedIn: false,
};

const storageSlice = createSlice({
  name: 'storage',
  initialState: storageInitialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = storageSlice.actions;

export default storageSlice.reducer;