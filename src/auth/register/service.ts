import { AxiosResponse } from 'axios';
import axiosInstance from 'src/common/utils/axios';
import { IRegisterFormValuesProps, IResRegisterMerchant } from './interface/interface';

export const registerMerchant = (params: IRegisterFormValuesProps) => {
  return axiosInstance.post<IRegisterFormValuesProps, AxiosResponse<IResRegisterMerchant>>(
    '/merchant/auth/register', 
    {
      params,
    }
  );
};