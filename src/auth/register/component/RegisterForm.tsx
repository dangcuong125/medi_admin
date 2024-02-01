import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useAuthRegister } from '../hook/useAuthRegister';
// components
import Iconify from 'src/common/components/Iconify';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { IRegisterFormValuesProps } from '../interface/interface';
import { RegisterSchema } from '../schema/register.schema';
import { defaultValues } from '../constants';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { showRegisterPasswordSelector, setEmail, setShowPassword } from '../reducer/register.slice';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

export default function RegisterForm() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const showPassword = useSelector(showRegisterPasswordSelector);
  const navigate = useNavigate();
  
    const methods = useForm<IRegisterFormValuesProps>({
      resolver: yupResolver(RegisterSchema),
      defaultValues,
    });
  
    const {
      reset,
      setError,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = methods;

    const onSuccess = () => {
      enqueueSnackbar('Đăng nhập thành công', {
        variant: 'success',
        autoHideDuration: 1000,
      });
      navigate(PATH_DASHBOARD.root, {replace : true});
    };
    const onError = () => {
      enqueueSnackbar('Đăng nhập thất bại ! xin kiểm tra lại thông tin', {
        variant: 'error',
      });
    };
    const { mutate, isSuccess } = useAuthRegister({ onSuccess, onError });

    const onSubmit = async (data: IRegisterFormValuesProps) => {
      dispatch(setEmail(data.email));
      const dataReq = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      }
      mutate(dataReq);
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
  
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="firstName" label="First name" />
            <RHFTextField name="lastName" label="Last name" />
          </Stack>
  
          <RHFTextField name="email" label="Email address" />
  
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => dispatch(setShowPassword(!showPassword))}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
  
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
    );
  }