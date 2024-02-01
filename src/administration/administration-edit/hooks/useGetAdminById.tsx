import { useQuery } from 'react-query';
import { getAdminInfoById } from '../services';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetGroupById = (id: string) => {
  return useQuery([QUERY_KEYS.GET_ADMIN_BY_ID, id], () => getAdminInfoById(id));
};
