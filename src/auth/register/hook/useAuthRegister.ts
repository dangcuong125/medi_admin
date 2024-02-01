import { useMutation } from 'react-query';
import { ILoginCallback } from '../../login/interface';
import { registerMerchant } from '../service';
export const useAuthRegister = (callback: ILoginCallback) => {
  return {
    ...useMutation(registerMerchant, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
