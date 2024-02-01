import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminCallback } from '../interface/merchant.interface';
import { getMerchantById } from '../service/merchant.service';

export const useGetMerchantById = ({
  id,
  callback,
}: {
  id: number;
  callback: IAdminCallback;
}) =>
  useQuery([QUERY_KEYS.EDIT_ADMIN, id], () => getMerchantById(id), {
    onSuccess() {
    },
    onError() {
      callback.onError && callback.onError();
    },
  });
