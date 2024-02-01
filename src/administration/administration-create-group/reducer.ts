import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IStateProps } from './interface';

const initialState: IStateProps = {
  postGroupPolicy: {
    name: '',
    description: '',
    policiesIds: [],
  },
  confirmPopup: false,
};

export const createGroupPolicy = createSlice({
  name: 'create-group-administration',
  initialState,
  reducers: {
    setPoliciesIds: (state, action: PayloadAction<number[]>) => {
      state.postGroupPolicy.policiesIds = action.payload;
    },
    setNameGroupPolicy: (state, action: PayloadAction<string>) => {
      state.postGroupPolicy.name = action.payload;
    },
    setDescriptionPolicy: (state, action: PayloadAction<string>) => {
      state.postGroupPolicy.description = action.payload;
    },
    resetCreateGroupPolicy: (state, action) => {
      state.postGroupPolicy.name = '';
      state.postGroupPolicy.description = '';
      state.postGroupPolicy.policiesIds = [];
      state.confirmPopup = false;
    },
    setConfirmPopup: (state, action: PayloadAction<boolean>) => {
      state.confirmPopup = action.payload;
    },
  },
});

export const {
  resetCreateGroupPolicy,
  setDescriptionPolicy,
  setNameGroupPolicy,
  setPoliciesIds,
  setConfirmPopup,
} = createGroupPolicy.actions;

export const selectNameGroupPolicy = (state: RootState) =>
  state.administrationCreateGroup.postGroupPolicy.name;
export const selectDescriptionPolicy = (state: RootState) =>
  state.administrationCreateGroup.postGroupPolicy.description;
export const selectPoliciesIds = (state: RootState) =>
  state.administrationCreateGroup.postGroupPolicy.policiesIds;
export const selectInfoCreateGroup = (state: RootState) =>
  state.administrationCreateGroup.postGroupPolicy;
export const selectConfirmPopup = (state: RootState) =>
  state.administrationCreateGroup.confirmPopup;
export default createGroupPolicy.reducer;
