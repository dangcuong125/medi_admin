import { useMutation } from 'react-query';
import { statusEnum } from 'src/auth/login/constants';
import { ILoginCallback } from '../../login/interface';
import { resetPassword } from '../service';
export const useResetPassword = (callback: ILoginCallback) => {
  return {
    ...useMutation(resetPassword, {
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