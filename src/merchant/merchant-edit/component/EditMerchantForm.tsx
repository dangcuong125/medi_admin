import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import useMessage from 'src/common/hooks/useMessage';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useEditMerchant } from 'src/merchant/hooks/useEditMerchant';
import { IFormMerchant } from 'src/merchant/interface/merchant.interface';
import { merchantDetailSelector } from 'src/merchant/reducer/merchant.slice';
import { NewMerchantSchema } from 'src/merchant/schema/merchant.schema';
import { defaultValues, merchantRankOptions, statusOptions } from '../../constant/merchant.constant';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'src/common/constants/common.utils';



function EditMerchantForm() {
  const params = useParams();
  const { t } = useTranslation();
  const dataMerchant = useSelector(merchantDetailSelector);
  const id = params?.id;
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate, isSuccess,isLoading } = useEditMerchant({
    onSuccess: () => {
        showSuccessSnackbar(t('edit_merchant_success'))
    },
    onError: () => {
      showErrorSnackbar(t('edit_merchant_fail'));
    },
  });
  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.merchant.list);
  }, [isSuccess]);

  const methods = useForm<IFormMerchant>({
    resolver: yupResolver(NewMerchantSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  useEffect(() => {
    if (dataMerchant) {
      reset(dataMerchant);
    }
  }, [dataMerchant]);
  const onSubmit = async (data: IFormMerchant) => {
    const dataReq: IFormMerchant = {
      email: data.email,
      id: data.id,
      createdAt: dataMerchant.createdAt as string,
      updatedAt: new Date().toUTCString(),
      rank: data.rank,
      status: data.status,
    }
    mutate({data: dataReq, id: parseInt(id as string)});
  };
  const handleCancel = () => {
    navigate(PATH_DASHBOARD.merchant.list, { replace : true});
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
            <RHFTextField
            disabled
                name="email"
                label="Email"
                InputLabelProps={{ shrink: true }}
              />
              <Stack direction="row" spacing={1.5}>
                <RHFTextField
                disabled
                name="createdAt"
                value={formatDate(watch('createdAt'))}
                label="Registration Date"
                InputLabelProps={{ shrink: true }}
              >
              </RHFTextField>

              <RHFTextField
                disabled
                name="id"
                label="ID"
                InputLabelProps={{ shrink: true }}
              />
              </Stack>
              <Stack direction="row" spacing={1.5}>
                <RHFSelect
                disabled
                name="rank"
                label="Rank"
                InputLabelProps={{ shrink: true }}
              >
                {merchantRankOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="status" label="Status" InputLabelProps={{ shrink: true }}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
          <LoadingButton
              fullWidth
              color="inherit"
              variant="contained"
              size="large"
              onClick={handleCancel}
            >
              {t('cancel')}
            </LoadingButton>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}

            >
              {t('save')}
            </LoadingButton>
          </Stack>
        </Grid>
      </FormProvider>
    </>
  );
}

export { EditMerchantForm };

