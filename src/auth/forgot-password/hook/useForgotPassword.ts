import { useMutation } from 'react-query';
import { statusEnum } from 'src/auth/login/constants';
import { ILoginCallback } from '../../login/interface';
import { forgotPassword } from '../service';
export const useForgotPassword = (callback: ILoginCallback) => {
  return {
    ...useMutation(forgotPassword, {
      onSuccess: (data) => {
        if (data?.meta?.status === statusEnum.ERROR) return callback.onError();
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
