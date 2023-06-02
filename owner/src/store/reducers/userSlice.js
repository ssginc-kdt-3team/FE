import { createSlice } from '@reduxjs/toolkit';

const userInitialState  = {
    id:''
};

//createSlice : reducer, action 생성 (둘을 캡슐화한 버전이 createSlice)
const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
      setUser: (state, action) => {
        console.log(state);
        state.id = action.payload.id;
      },
      clearUser: (state) => {
        state.id = '';
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