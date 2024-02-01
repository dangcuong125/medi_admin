import { IAdminRoleInfos } from 'src/common/casl/interfaces';

export interface IInitialState {
  menuItemSelected: null | HTMLElement;
  searchInputValue: string;
  status: string;
  adminId: null | string;
  isOpenDeleteModal: boolean;
  pickedAdminIds: string[];
  isOpenDeleteMultipleAdminModal: boolean;
  authorizationAdmin: null | IAdminRoleInfos;
  groupId: number[] | null;
}
export interface IAdminList {
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  version: number;
  key: string;
  name: string;
  status: string;
  userId: number;
}
export interface IGetGroupParam {
  status?: string;
  searchText: string;
  page: number;
  limit: number;
}
export interface IAdminToDeleteParams {
  ids: string[] | number[];
}
