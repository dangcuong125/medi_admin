import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IUserSlice } from './interface';

const initialState: IUserSlice = {
  searchFilter: '',
  searchRole: 'All',
};

const FilterUserSlice = createSlice({
  name: 'filter_user',
  initialState,
  reducers: {
    searchFilterChange: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    searchRoleChange: (state, action: PayloadAction<string>) => {
      state.searchRole = action.payload;
    },
    resetSearchUser: (state) => {
      state.searchFilter = '';
      state.searchRole = '';
    },
  },
});

export const { searchFilterChange, searchRoleChange, resetSearchUser } =
  FilterUserSlice.actions;
export const selectSearchFilterUser = (state: RootState) => state.filterUser.searchFilter;
export const selectSearchRoleUser = (state: RootState) => state.filterUser.searchRole;

export default FilterUserSlice.reducer;
