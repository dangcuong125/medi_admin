import { API_GROUP_POLICY } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { INewDataEditAdmin } from './interface';

export const getAdminInfoById = (key: string) => {
  return axiosInstance.get(API_GROUP_POLICY + '/' + key);
};
export const editInfoGroup = (data: INewDataEditAdmin) => {
  return axiosInstance.patch(API_GROUP_POLICY, data);
};
export const getAllGroupPolicy = (page: number, limit: number) => {
  return axiosInstance.get(API_GROUP_POLICY, {
    params: {
      page,
      limit,
    },
  });
};
