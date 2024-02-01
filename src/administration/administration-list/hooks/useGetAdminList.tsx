import { useQuery } from 'react-query';
import { getGroupList } from '../services';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useGetGroupList = (
  searchText: string,
  status: string,
  page: number,
  limit: number
) => {
  return useQuery([QUERY_KEYS.GET_ADMIN_LIST, searchText, page, limit, status], () =>
    getGroupList(searchText, status, page, limit)
  );
};
