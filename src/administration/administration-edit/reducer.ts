import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, IUserToGroupPolicyRes, IEditFormValue } from './interface';

const initialState: IInitialState = {
  groupNameValue: '',
  isOpenConfirmModal: false,
  defaultGroupNameValue: '',
  groupName: '',
  status: '',
  description: '',
};

const administrationEditSlice = createSlice({
  name: 'admin-detail',
  initialState,
  reducers: {
    setGroupNameValue: (state, action: PayloadAction<IEditFormValue>) => {
      state.groupNameValue = action.payload.groupName;
      state.description = action.payload.description;
    },
    setOpenConfirmModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenConfirmModal = action.payload;
    },
    getDefaultGroupNameValue: (state, action: PayloadAction<IUserToGroupPolicyRes[]>) => {
      const groupNames = action.payload?.map(
        (item: IUserToGroupPolicyRes) => item?.groupPolicyKey
      );
      state.defaultGroupNameValue = groupNames?.join(',');
    },
    setGroupName: (state, action: PayloadAction<string>) => {
      state.groupName = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const {
  actions: {
    setGroupNameValue,
    setOpenConfirmModal,
    getDefaultGroupNameValue,
    setGroupName,
    setStatus,
  },
  reducer,
} = administrationEditSlice;
