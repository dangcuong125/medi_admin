import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { getRelatedCacheKeys } from 'src/common/utils/getRelatedCacheKeys';
import { STATUS_RES_ERR } from '../constant/merchant.constant';
import { IAdminCallback } from '../interface/merchant.interface';
import { addAllNewMerchants } from '../service/merchant.service';

export const useAddNewMerchant = (callback: IAdminCallback) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return {
    ...useMutation(addAllNewMerchants, {
      onSuccess: (_result, _variables) => {
        if (_result.data.meta.status > STATUS_RES_ERR) {
          return callback.onError && callback.onError();
        }
        navigate(PATH_DASHBOARD.merchant.list);
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
