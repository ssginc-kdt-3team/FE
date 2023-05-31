import { createSlice } from '@reduxjs/toolkit';

const userInitialState  = {
    id:'',
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
  // 비동기 작업 수행 가능
  setTimeout(() => {
    dispatch(clearUser());
  }, 1000);
};

export default userSlice; 