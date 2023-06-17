import { createSlice } from '@reduxjs/toolkit';

// initial state
const userInitialState  = {
    id:'',
    name: ''
};

// ==============================|| SLICE - USER ||============================== //
const userSlice = createSlice({                             //createSlice : reducer, action 생성 (둘을 캡슐화한 버전이 createSlice)
    name: 'user',
    initialState: userInitialState,
    reducers: {
      setUser: (state, action) => {
        console.log(state);
        state.id = action.payload.id;
        state.name = action.payload.name;
      },
      clearUser: (state) => {
        state.id = '';
        state.name = '';
        console.log(state);
      },
    },
  });


export const { setUser, clearUser } = userSlice.actions;

export const clearUserAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(clearUser());
  }, 1000);
};

export default userSlice; 