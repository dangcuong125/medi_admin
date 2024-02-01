import { API_ADMIN_FORGOTPASSWORD } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IReqResetPass } from './interface/interface';
import { IResForgotPass } from '../login/interface';

export const resetPassword = (params: IReqResetPass) => {
  return axiosInstance.post<unknown, IResForgotPass>(
    API_ADMIN_FORGOTPASSWORD,
    {
      params,
    }
  );
};
