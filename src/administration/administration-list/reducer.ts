import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminList, IInitialState } from './interface';
import { IAdminRoleInfos, IAdminRoleGroupPolicy } from 'src/common/casl/interfaces';

const initialState: IInitialState = {
  menuItemSelected: null,
  searchInputValue: '',
  status: 'ALL',
  adminId: null,
  isOpenDeleteModal: false,
  pickedAdminIds: [],
  isOpenDeleteMultipleAdminModal: false,
  authorizationAdmin: null,
  groupId: null,
};

const administrationSlice = createSlice({
  name: 'administration-reducer',
  initialState,
  reducers: {
    setMenuItemSelected: (state, action: PayloadAction<HTMLElement | null>) => {
      // @ts-ignore
      state.menuItemSelected = action.payload;
    },
    setValueInputSearch: (state, action) => {
      state.searchInputValue = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setAdminId: (state, action: PayloadAction<string>) => {
      state.adminId = action.payload;
    },
    setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenDeleteModal = action.payload;
    },
    setPickedAdminIds: (state, action: PayloadAction<IAdminList[]>) => {
      state.pickedAdminIds = action.payload?.map((item: IAdminList) => item?.key);
    },
    setIsOpenDeleteMultipleAdminModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenDeleteMultipleAdminModal = action.payload;
    },
    setAuthorizationForAdmin: (state, action: PayloadAction<IAdminRoleInfos[]>) => {
      action?.payload?.forEach((item: IAdminRoleInfos) => {
        state.authorizationAdmin = item;
        state.groupId = item?.groupPolicy?.groupToPolicies?.map(
          (policy: IAdminRoleGroupPolicy) => policy.policyId
        );
      });
    },
  },
});

export const {
  actions: {
    setMenuItemSelected,
    setValueInputSearch,
    setStatus,
    setAdminId,
    setOpenDeleteModal,
    setPickedAdminIds,
    setIsOpenDeleteMultipleAdminModal,
    setAuthorizationForAdmin,
  },
  reducer,
} = administrationSlice;
