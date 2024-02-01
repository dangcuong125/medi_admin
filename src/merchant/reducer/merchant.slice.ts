import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../common/redux/store';
import { IFormMerchant } from '../interface/merchant.interface';

type StateProps = {
  filterName: string,
  filterStatus: string,
  filterRank: string,
  merchantDetail: Partial<IFormMerchant>,
  selectedIds: number[],
  deleteModal: boolean,
  confirmedDelete: boolean,
};

const initialState: StateProps = {
  filterName: '',
  filterStatus: '',
  filterRank: '',
  merchantDetail: {},
  selectedIds: [],
  deleteModal: false,
  confirmedDelete: false,
};

export const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
    setFilterRank: (state, action: PayloadAction<string>) => {
      state.filterRank = action.payload;
    },
    setMerchantDetail: (state, action: PayloadAction<IFormMerchant>) => {
      state.merchantDetail = action.payload;
    },

    setSelectedIds: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    setDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.deleteModal = action.payload;
    },
    setConfirmedDelete: (state, action: PayloadAction<boolean>) => {
      state.confirmedDelete = action.payload;
    }
  },
});

export const {
  setFilterName,
  setFilterStatus,
  setFilterRank,
  setMerchantDetail,
  setDeleteModal,
  setConfirmedDelete,
  setSelectedIds,
} = merchantSlice.actions;

export const filterNameSelector = (state: RootState) => state.merchant.filterName;
export const filterStatusSelector = (state: RootState) => state.merchant.filterStatus;
export const filterRankSelector = (state: RootState) => state.merchant.filterRank;
export const merchantDetailSelector = (state: RootState) => state.merchant.merchantDetail;
export const selectedIdsSelector = (state: RootState) => state.merchant.selectedIds;
export const deleteModalSelector = (state: RootState) => state.merchant.deleteModal;
export const confirmedDeleteSelector = (state: RootState) => state.merchant.confirmedDelete;

export default merchantSlice.reducer;
