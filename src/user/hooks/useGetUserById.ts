import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IUserCallback } from '../interface';
import { getUserById } from '../services';

export function useGetUserById({
  id,
  callback,
}: {
  id: number;
  callback: IUserCallback;
}) {
  return {
    ...useQuery([QUERY_KEYS.MANAGE_USER, id], () => getUserById(id), {
      onSuccess() {
        callback.onSuccess && callback.onSuccess();
      },
      onError() {
        callback.onError && callback.onError();
      },
    }),
  };
}
