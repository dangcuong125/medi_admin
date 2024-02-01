import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  email: string;
};
const initialState: StateProps = {
  email: '',
};
export const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setEmailForgot: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmailForgot } = forgotPasswordSlice.actions;

export const emailForgotSelector = (state: RootState) => state.forgotPassword.email;

export default forgotPasswordSlice.reducer;
