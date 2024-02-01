import * as Yup from 'yup';

export const AdminSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  groupPolicyKeys: Yup.array().min(1, 'Group Policy can not null').required('Group is required')
});

export const AdminSchemaEdit = Yup.object().shape({
  status: Yup.string().required('Status is required'),
  groupPolicyKeys: Yup.array().min(1, 'Group Policy can not null').required('Group is required')
})