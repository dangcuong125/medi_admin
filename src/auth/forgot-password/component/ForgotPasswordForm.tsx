import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../common/routes/paths';
// hooks
import useShowSnackbar from 'src/common/hooks/useMessage';
import { useForgotPassword } from '../hook/useForgotPassword';
// components
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { IForgotPasswordFormValuesProps } from "../interface/interface";
import { ForgotPasswordSchema } from "../schema/forgot-password.schema";
import { forgotPwDefaultValues } from '../constants/default-values.constants';
import { setEmailForgot } from '../reducer/forgot-password.slice';
import { dispatch } from 'src/common/redux/store';
// ----------------------------------------------------------------------


export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const { showErrorSnackbar } = useShowSnackbar();

  const methods = useForm<IForgotPasswordFormValuesProps>({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues : forgotPwDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSuccess = () => {
    navigate(PATH_AUTH.resetPassword);
  };
  const onError = () => {
    showErrorSnackbar('Vui lòng kiểm tra lại email!');
  };
  const { mutate } = useForgotPassword({ onSuccess, onError });
  const onSubmit = (data: IForgotPasswordFormValuesProps) => {
    dispatch(setEmailForgot(data.email));
    mutate({email: data.email});
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email"
         label="Email address"
         placeholder="demo@minimals.cc" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Send Request
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
