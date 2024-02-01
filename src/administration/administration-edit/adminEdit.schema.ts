import * as yup from 'yup';

export const adminEditSchema = yup.object().shape({
  groupName: yup.string().required('Group name field is required').nullable(),
  description: yup.string().required('Description field is required'),
});
