import { createSlice } from '@reduxjs/toolkit';

const shopinitialState = {
  shopId: '',
};

const shopSlice = createSlice({
  name: 'shop',
  initialState: shopinitialState,
  reducers: {
    setShopInfo: (state, action) => {
      state.shopId = action.payload.shopId;
    }
  }
});

export const { setShopInfo } = shopSlice.actions;

export default shopSlice;