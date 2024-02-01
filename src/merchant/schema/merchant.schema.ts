import * as Yup from 'yup';

export const NewMerchantSchema = Yup.object().shape({
  status: Yup.string().required('status is required'),
});