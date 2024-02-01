import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import dayjs from 'dayjs';
import { reset } from 'numeral';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { RHFSelectPagitnationMultiple } from 'src/admin/admin-common/RHFSelectPagination';
import { setConfirmPopup, setCreatedDate, setInfoEditAdmin } from 'src/admin/admin.slice';
import { defaultValueEditAdmin, status } from 'src/admin/constant';
import { useGetAdminById } from 'src/admin/hooks/useGetAdminById';
import { IValidateEditAdmin } from 'src/admin/interface';
import { AdminSchemaEdit } from 'src/admin/schema';
import { getGroupPolicy } from 'src/admin/service';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useMessage from 'src/common/hooks/useMessage';
import { dispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import BasicDateTimePicker from '../DateTimePicker';
import ModalConfirmEdit from '../ModalConfirmEdit';

export default function AdminEditForm() {
  const { useDeepCompareEffect } = useDeepEffect();
  const params = useParams();
  const adminId = params?.id;
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { data } = useGetAdminById({
    id: parseInt(adminId as string),
    callback: {
      onSuccess: () => {},
      onError: () => showErrorSnackbar('Get admin fail'),
    },
  });

  const methods = useForm<IValidateEditAdmin>({
    resolver: yupResolver(AdminSchemaEdit),
    defaultValues: defaultValueEditAdmin,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const createdDateAdmin = dayjs(data?.createdAt);
  dispatch(setCreatedDate(createdDateAdmin));
  const idAdmin = data?.id || 0;

  const grPolicyKeysList =
    data &&
    data?.user.userToGroupPolicies.map((item) => {
      return { label: item.groupPolicy.name, value: item.groupPolicy.key };
    });

  useDeepCompareEffect(() => {
    if (data) {
      reset({
        adminId: data.id,
        username: data.username,
        status: data.status,
        groupPolicyKeys: grPolicyKeysList,
      });
    }
  }, [data]);

  const onSubmit = (data: IValidateEditAdmin) => {
    const dataEdit = {
      status: data.status,
      adminId: idAdmin,
      groupPolicyKeys: data?.groupPolicyKeys?.map((item) => item.value) || [],
    };
    dispatch(setInfoEditAdmin(dataEdit));
    dispatch(setConfirmPopup(true));
  };

  return (
    <>
      <Paper elevation={3}>
        <Container sx={{ padding: '25px' }}>
          <Grid container direction="column" justifyContent="space-between">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <RHFTextField
                name="username"
                label="Name"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon={'fluent-mdl2:field-read-only'} />
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction="row" spacing={2} mt={3} mb={3}>
                <BasicDateTimePicker />
                <RHFSelect
                  name="status"
                  label="Status"
                  InputLabelProps={{ shrink: true }}
                >
                  {status.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>

              <RHFSelectPagitnationMultiple
                name="groupPolicyKeys"
                placeholder="Group Policy"
                getAsyncData={getGroupPolicy}
                error={errors}
              />
              <FormHelperText sx={{ color: 'red', marginLeft: '20px' }}>
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
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save Change
                </Button>
              </Stack>
              <ModalConfirmEdit />
            </FormProvider>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
