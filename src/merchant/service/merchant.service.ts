import { API_ADMIN_MERCHANT, API_ADMIN } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IResMerchants, IMerchantParams, IFormMerchant } from '../interface/merchant.interface';

export const getMerchants = (params: IMerchantParams): Promise<IResMerchants> => {
  return axiosInstance.get(`${API_ADMIN_MERCHANT}`, { params });
};

export const deleteMerchantById = (id: number) => {
  return axiosInstance.delete(`${API_ADMIN_MERCHANT}/${id}`);
};

export const addAllNewMerchants = (data: IFormMerchant) => {
  return axiosInstance.post(API_ADMIN, data);
};

export const getMerchantById = (id: number): Promise<IFormMerchant> => {
  return axiosInstance.get(`${API_ADMIN_MERCHANT}/${id}`);
} 
export const editMerchant = ({ data, id }: { data: IFormMerchant; id: number }) =>
  axiosInstance.put(`${API_ADMIN_MERCHANT}/${id}`, data);
