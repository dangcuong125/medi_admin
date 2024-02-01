import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  email: string;
  showPassword: boolean;
};
const initialState: StateProps = {
  showPassword: false,
  email: '',
};
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setShowPassword, setEmail } = registerSlice.actions;

export const showRegisterPasswordSelector = (state: RootState) => state.register.showPassword;
export const emailRegisterSelector = (state: RootState) => state.register.email;

export default registerSlice.reducer;
