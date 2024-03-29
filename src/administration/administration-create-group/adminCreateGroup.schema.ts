import * as yup from 'yup';

export const adminCreateGroupSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});
