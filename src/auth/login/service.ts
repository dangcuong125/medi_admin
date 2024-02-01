import axios from 'src/common/utils/axios';
import { IAuth, IResLogin } from './interface';

export const getAuth = (params: IAuth): Promise<IResLogin> => {
  return axios.post('admin/auth/login', params);
};

