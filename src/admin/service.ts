import { API_ADMIN, API_GROUP_POLICY } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import {
  IAdminParams,
  IFormAdmin,
  IPatchAdmin,
  IPostNewAdmin,
  IResAdmins,
  IResGroupPolicy,
} from './interface';

export const getAdmin = async (params: IAdminParams) => {
  return axiosInstance.get<unknown, IResAdmins>(`${API_ADMIN}`, {
    params: {
      status: params.status,
      searchText: params.searchText,
      page: params.page,
      limit: params.limit,
    },
  });
};

export const deleteAdmin = (id: number) => {
  const data = axiosInstance.delete(`${API_ADMIN}/${id}`, { data: { id: id } });
  return data;
};

export const addAllNewAccount = (data: IPostNewAdmin) => {
  return axiosInstance.post(API_ADMIN, data);
};

export const getAdminById = (id: number) =>
  axiosInstance.get<unknown, IFormAdmin>(`${API_ADMIN}/${id}`);

export const editAdmin = ({ data }: { data: IPatchAdmin }) =>
  axiosInstance.patch(`${API_ADMIN}`, data);

export const getGroupPolicy = async () => {
  return axiosInstance.get<unknown, IResGroupPolicy>(`${API_GROUP_POLICY}`);
};
