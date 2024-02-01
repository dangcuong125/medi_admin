import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { IAdminCallback } from '../interface/merchant.interface';
import { deleteMerchantById } from '../service/merchant.service';

export function useDeleteMerchantById(callback: IAdminCallback) {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteMerchantById(id), {
    onSuccess: (_rs, _variables) => {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.MERCHANT])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
      callback.onSuccess && callback.onSuccess();
    },
    onError: (error, _variables) => {
      callback.onError && callback.onError();
    },
    retry: 2,
  });
}
