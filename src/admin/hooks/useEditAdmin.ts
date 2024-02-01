import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminCallback } from '../interface';
import { editAdmin } from '../service';

export const useEditAdmin = (callback: IAdminCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editAdmin, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.EDIT_ADMIN]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
