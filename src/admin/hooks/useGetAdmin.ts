import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IAdminParams } from '../interface';
import { getAdmin } from '../service';

export function useGetAdmin(params: IAdminParams) {
  return {
    ...useQuery([QUERY_KEYS.ADMIN, params], () => getAdmin(params)),
  };
}
