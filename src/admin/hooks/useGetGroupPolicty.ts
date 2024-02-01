import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getGroupPolicy } from '../service';

export function useGetGroupPolicy() {
  return {
    ...useQuery([QUERY_KEYS.GROUP_POLICY], () => getGroupPolicy()),
  };
}
