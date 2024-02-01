import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RHFSelectPagitnationMultiple } from 'src/admin/admin-common/RHFSelectPagination';
import {
  setConfirmPopup,
  setInfoNewAdmin,
  setShowConfirmPassword,
  setShowPassword,
  showConfirmPassword,
  showPassword,
} from 'src/admin/admin.slice';
import { defaultValuesAdmin } from 'src/admin/constant';
import { ISubmitDataAdmin } from 'src/admin/interface';
import { AdminSchema } from 'src/admin/schema';
import { getGroupPolicy } from 'src/admin/service';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import { dispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import ModalConfirmCreate from '../ModalConfirmCreate';
import en from '../../../common/locales/en';

export default function AdminCreateForm() {
  const navigate = useNavigate();

  const methods = useForm<ISubmitDataAdmin>({
    resolver: yupResolver(AdminSchema),
    defaultValues: defaultValuesAdmin,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const isShowPassword = useSelector(showPassword);
  const isShowCfPassword = useSelector(showConfirmPassword);

  const onSubmit = (data: ISubmitDataAdmin) => {
    const dataAddNew = {
      username: data.username,
      password: data.password,
      groupPolicyKeys: data?.groupPolicyKeys?.map((item) => item.value) || [],
    };
    dispatch(setInfoNewAdmin(dataAddNew));
    dispatch(setConfirmPopup(true));
  };

  return (
    <>
      <Paper elevation={3}>
        <Container sx={{ padding: '25px' }}>
          <Grid container direction="column" justifyContent="space-between">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="column" spacing={3}>
                <RHFTextField
                  name="username"
                  label="Name"
                  InputLabelProps={{ shrink: true }}
                  placeholder="Input Admin Name"
                />

                <RHFTextField
                  name="password"
                  label="Password"
                  type={isShowPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => dispatch(setShowPassword(!isShowPassword))}
                          edge="end"
                        >
                          <Iconify
                            icon={isShowPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <RHFTextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type={isShowCfPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            dispatch(setShowConfirmPassword(!isShowCfPassword))
                          }
                          edge="end"
                        >
                          <Iconify
                            icon={isShowCfPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <RHFSelectPagitnationMultiple
                  name="groupPolicyKeys"
                  placeholder="Group Policy"
                  getAsyncData={getGroupPolicy}
                  error={errors}
                />
                <FormHelperText sx={{ color: 'red', paddingLeft: '17px' }}>
                  {errors?.groupPolicyKeys?.message}
                </FormHelperText>

                <Stack direction="row" justifyContent="flex-end" mt={5} spacing={4}>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                      navigate(PATH_DASHBOARD.admin.list);
                    }}
                  >
                    {en.cancle}
                  </Button>
                  <Button variant="contained" type="submit">
                    {en.add}
                  </Button>
                </Stack>
              </Stack>
              <ModalConfirmCreate />
            </FormProvider>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
