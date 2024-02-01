import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IUserCallback, IUserParams } from '../interface';
import { getUser } from '../services';

export function useGetUser({
  params,
  callback,
}: {
  params: IUserParams;
  callback: IUserCallback;
}) {
  return {
    ...useQuery([QUERY_KEYS.MANAGE_USER, params], () => getUser(params), {
      onSuccess() {
        callback.onSuccess && callback.onSuccess();
      },
      onError() {
        callback.onError && callback.onError();
      },
    }),
  };
}
