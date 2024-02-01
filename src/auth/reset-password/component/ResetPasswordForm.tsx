import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useResetPassword } from '../hook/useResetPassword';
// routes
import { PATH_AUTH } from '../../../common/routes/paths';
// components
import Iconify from '../../../common/components/Iconify';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { IReqResetPass, IResetPasswordFormValuesProps, ValueNames } from '../interface/interface';
import { resetPwDefaultValues } from '../constants/reset-password.constant';
import { VerifyCodeSchema } from '../schema/reset-password.schema';
import useShowSnackbar from 'src/common/hooks/useMessage';
import { useSelector } from 'react-redux';
import { emailForgotSelector, setEmailForgot } from 'src/auth/forgot-password/reducer/forgot-password.slice';
import { dispatch } from 'src/common/redux/store';
// ----------------------------------------------------------------------





export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { showErrorSnackbar } = useShowSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const emailRecovery = useSelector(emailForgotSelector);

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues : {...resetPwDefaultValues, email : emailRecovery || '',},
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    const target = document.querySelector('input.field-code');

    target?.addEventListener('paste', handlePaste);

    return () => {
      target?.removeEventListener('paste', handlePaste);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaste = (event: any) => {
    let data = event.clipboardData.getData('text');

    data = data.split('');

    [].forEach.call(document.querySelectorAll('.field-code'), (node: any, index) => {
      node.value = data[index];

      const fieldIndex = `code${index + 1}`;

      setValue(fieldIndex as ValueNames, data[index]);
    });

    event.preventDefault();
  };

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          (nextfield as HTMLElement).focus();
        }
      }
    }

    handleChange(event);
  };

  const onSuccess = () => {
    dispatch(setEmailForgot(""));

    enqueueSnackbar('Change password success!');

    navigate(PATH_AUTH.login, { replace: true });
  }

  const onError = () => {
    showErrorSnackbar('Invalid code');
  }

  const { mutate } = useResetPassword({ onSuccess, onError });

  const onSubmit = (data: IResetPasswordFormValuesProps) => {
      const reqResetPassword : IReqResetPass = {
        password: data.password,
        token: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`
      }
      mutate({password: reqResetPassword.password, token: reqResetPassword.token});
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" disabled={!!emailRecovery}/>

        <Stack direction="row" spacing={2} justifyContent="center">
          {['code1', 'code2', 'code3', 'code4', 'code5', 'code6'].map((name, index) => (
            <Controller
              key={name}
              name={`code${index + 1}` as ValueNames}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <OutlinedInput
                  {...field}
                  error={!!error}
                  autoFocus={index === 0}
                  placeholder="-"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeWithNextField(event, field.onChange)
                  }
                  inputProps={{
                    className: 'field-code',
                    maxLength: 1,
                    sx: {
                      p: 0,
                      textAlign: 'center',
                      width: { xs: 36, sm: 56 },
                      height: { xs: 36, sm: 56 },
                    },
                  }}
                />
              )}
            />
          ))}
        </Stack>

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2 }}>
            Code is required
          </FormHelperText>
        )}

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
          sx={{ mt: 3 }}
        >
          Change password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
