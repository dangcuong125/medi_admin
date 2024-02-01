import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';
import { RootState } from 'src/common/redux/store';
import { defaultValueEditAdmin, defaultValuesAdmin } from './constant';
import { IPatchAdmin, IPostNewAdmin, StateProps } from './interface';

const currentDate = new Date().toLocaleString();

const initialState: StateProps = {
  confirmPopup: false,
  filterName: undefined,
  selectIdsAdmin: [],
  showSkeleton: false,
  createdDate: dayjs(currentDate),
  groupPolicy: [],
  infoNewAdmin: defaultValuesAdmin,
  infoEditAdmin: defaultValueEditAdmin,
  statusSearch: undefined,
  showPassword: false,
  showConfirmPassword: false  
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setConfirmPopup: (state, action: PayloadAction<boolean>) => {
      state.confirmPopup = action.payload;
    },
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
    setSelectIdsAdmin: (state, action: PayloadAction<number[]>) => {
      state.selectIdsAdmin = action.payload;
    },
    setShowSkeleton: (state, action: PayloadAction<boolean>) => {
      state.showSkeleton = action.payload;
    },
    setCreatedDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.createdDate = action.payload;
    },
    setGroupPolicy: (state, action: PayloadAction<string[]>) => {
      state.groupPolicy = action.payload;
    },
    setInfoNewAdmin: (state, action: PayloadAction<IPostNewAdmin>) => {
      state.infoNewAdmin = action.payload;
    },
    setInfoEditAdmin: (state, action: PayloadAction<IPatchAdmin>) => {
      state.infoEditAdmin = action.payload;
    },
    setStatusSearch: (state, action: PayloadAction<string | undefined>) => {
      state.statusSearch = action.payload;
    },
    setShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload;
    },
    setShowConfirmPassword: (state, action: PayloadAction<boolean>) => {
      state.showConfirmPassword = action.payload;
    },
  },
});

export const {
  setConfirmPopup,
  setFilterName,
  setSelectIdsAdmin,
  setShowSkeleton,
  setCreatedDate,
  setGroupPolicy,
  setInfoNewAdmin,
  setInfoEditAdmin,
  setStatusSearch,
  setShowPassword,
  setShowConfirmPassword,
} = adminSlice.actions;

export const confirmPopupEventState = (state: RootState) => state.admin.confirmPopup;
export const filterNameSelector = (state: RootState) => state.admin.filterName;
export const selectIdsAdminState = (state: RootState) => state.admin.selectIdsAdmin;
export const showSkeleton = (state: RootState) => state.admin.showSkeleton;
export const createdDate = (state: RootState) => state.admin.createdDate;
export const groupPolicy = (state: RootState) => state.admin.groupPolicy;
export const infoNewAdmin = (state: RootState) => state.admin.infoNewAdmin;
export const infoEditAdmin = (state: RootState) => state.admin.infoEditAdmin;
export const statusSearch = (state: RootState) => state.admin.statusSearch;
export const showPassword = (state: RootState) => state.admin.showPassword;
export const showConfirmPassword = (state: RootState) => state.admin.showConfirmPassword;

export default adminSlice.reducer;
