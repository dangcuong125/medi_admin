import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { IAdminCallback } from '../interface';
import { addAllNewAccount } from '../service';

export const useCreateAdmin = (callback: IAdminCallback) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return {
    ...useMutation(addAllNewAccount, {
      onSuccess: (_result, _variables) => {
        navigate(PATH_DASHBOARD.admin.list);
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
