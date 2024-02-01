import { useMutation, useQueryClient } from 'react-query';
import { deleteGroupById } from '../services';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';

export const useDeleteGroupById = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteGroupById, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.GET_ADMIN_LIST);
    },
  });
};
