import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { ICreateGroupCallback } from '../interface';
import { postGroupPolicy } from '../services';

export const useCreateGroupPolicy = (callback: ICreateGroupCallback) => {
  const navigate = useNavigate();

  return {
    ...useMutation(postGroupPolicy, {
      onSuccess: (_result, _variables) => {
        navigate(PATH_DASHBOARD.general.administrationList);
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
