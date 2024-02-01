import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminCallback } from '../interface/merchant.interface';
import { editMerchant } from '../service/merchant.service';

export const useEditMerchant = (callback: IAdminCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editMerchant, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_ADMIN, variables.id]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
