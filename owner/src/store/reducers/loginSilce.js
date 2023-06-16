import { createSlice } from '@reduxjs/toolkit';   //localsotorage에 저장

// initial state
const loginInitialState  = {
  isLoggedIn: false,
};

// ==============================|| SLICE - LOGIN ||============================== //
const loginSlice = createSlice({
  name: 'loginstate',
  initialState: loginInitialState,
  reducers: {
    setLoggedIn: (state, action) => {
      console.log(state);
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = loginSlice.actions;

export default loginSlice;