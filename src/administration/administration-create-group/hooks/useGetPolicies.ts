import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getPolicies } from '../services';

export const useGetPolicies = () => {
  return {
    ...useQuery([QUERY_KEYS.GET_POLICIES], getPolicies),
  };
};
