import { API_GROUP_POLICY, AUTHORIZATION } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IPostGroupPolicy, IResPolicies } from './interface';

export const postGroupPolicy = (data: IPostGroupPolicy) => {
  return axiosInstance.post(API_GROUP_POLICY, data);
};

export const getPolicies = async () => {
  return axiosInstance.get<unknown, IResPolicies[]>(AUTHORIZATION);
};
