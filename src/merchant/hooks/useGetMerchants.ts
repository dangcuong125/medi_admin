import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import { IMerchantParams } from '../interface/merchant.interface';
import { getMerchants } from '../service/merchant.service';

export function useGetMerchants(params: IMerchantParams) {
  return {
    ...useQuery([QUERY_KEYS.MERCHANT, params],() => getMerchants(params)),
  };
}
