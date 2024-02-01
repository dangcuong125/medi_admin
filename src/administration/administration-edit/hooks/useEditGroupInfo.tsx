import { useMutation } from 'react-query';
import { editInfoGroup } from '../services';

export const useEditGroupInfo = () => {
  return useMutation(editInfoGroup);
};
