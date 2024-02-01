import { useQuery } from 'react-query';
import { getAdminAuthorization } from 'src/administration/administration-list/services';
import { QUERY_KEYS } from '../constants/queryKeys.constant';

export const useGetAdminAuthorization = () => {
  return useQuery([QUERY_KEYS.GET_AUTHORIZATION_ADMIN], getAdminAuthorization);
};
