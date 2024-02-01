import { API_GET_USER } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IUserParams, IUserResponse, IUserRow } from './interface';

export const getUser = (params: IUserParams): Promise<IUserResponse> => {
  return axiosInstance.get(API_GET_USER, {
    params,
  });
};

export const getUserById = (id: number): Promise<IUserRow> => {
  return axiosInstance.get(`${API_GET_USER}/${id}`);
};

export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  }
  return str;
}
