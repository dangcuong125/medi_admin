import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  username: string;
  showPassword: boolean;
};
const initialState: StateProps = {
  showPassword: false,
  username: '',
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setShowPassword, setUsername } = loginSlice.actions;

export const showPasswordSelector = (state: RootState) => state.login.showPassword;
export const usernameSelector = (state: RootState) => state.login.username;

export default loginSlice.reducer;
