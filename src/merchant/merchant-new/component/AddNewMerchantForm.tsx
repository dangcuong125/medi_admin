import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { IFormMerchant } from 'src/merchant/interface/merchant.interface';
import {
  merchantRankOptions, newMerchantDefaultValues, statusOptions
} from '../../constant/merchant.constant';
import { useAddNewMerchant } from '../../hooks/useAddNewMerchant';
import { NewMerchantSchema } from '../../schema/merchant.schema';

function AddNewMerchantForm() {
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess } = useAddNewMerchant({
    onSuccess: () => {
      showSuccessSnackbar('Add admin successfully');
    },
    onError: () => {
      showErrorSnackbar('Add admin fail');
    },
  });
  const methods = useForm<IFormMerchant>({
    resolver: yupResolver(NewMerchantSchema),
    defaultValues: newMerchantDefaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmit = (data: IFormMerchant) => {
    mutate(data);
  };
  const handleCancel = () => {
    navigate(PATH_DASHBOARD.merchant.list);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <RHFTextField name="name" label="Name" />
              <Controller
                name="createdAt"
                key={'createdAt'}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ngày bắt đầu"
                    key={'registrationDate'}
                    type="datetime-local"
                    defaultValue={dayjs(new Date()).format("YYYY-MM-DDTHH:mm")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
              <RHFSelect name="status" label="Status" placeholder="status">
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                name="merchantRank"
                label="Merchant Rank"
                placeholder="Merchant Rank"
              >
                {merchantRankOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Add New
            </LoadingButton>
            <LoadingButton
              fullWidth
              color="inherit"
              variant="contained"
              size="large"
              onClick={handleCancel}
            >
              Cancel
            </LoadingButton>
          </Stack>
        </Grid>
      </FormProvider>
    </>
  );
}

export { AddNewMerchantForm };

