//localsotorage에 저장
import { createSlice } from '@reduxjs/toolkit';


const loginInitialState  = {
  isLoggedIn: false,
};

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