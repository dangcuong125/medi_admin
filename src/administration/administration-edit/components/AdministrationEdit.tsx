import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { useTranslation } from 'react-i18next';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { Box, Button, FormControl, MenuItem, TextField, Typography } from '@mui/material';
import { useGetGroupById } from '../hooks/useGetAdminById';
import { yupResolver } from '@hookform/resolvers/yup';
import { adminEditSchema } from '../adminEdit.schema';
import { setGroupNameValue, setOpenConfirmModal, setStatus } from '../reducer';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { useEffect } from 'react';
import { IEditFormValue } from '../interface';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmModal from 'src/administration/administration-list/components/ConfirmModal';
import { useEditGroupInfo } from '../hooks/useEditGroupInfo';
import { Controller, useForm } from 'react-hook-form';
import useMessage from 'src/common/hooks/useMessage';
import can from 'src/common/casl/defineAbility';
import { formatDate } from 'src/common/constants/common.utils';
import { optionsStatus } from '../constant';

const boxShadowForEditForm =
  '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12);';

export default function AdministrationEdit() {
  const { t } = useTranslation();
  const { key } = useParams();
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const navigate = useNavigate();

  const { data: groupDetail } = useGetGroupById(key as string);
  const { mutate } = useEditGroupInfo();

  const isOpenConfirmModal = useSelector(
    (state) => state.administrationEditReducer.isOpenConfirmModal
  );
  const status = useSelector((state) => state.administrationEditReducer.status);
  const groupNameValue = useSelector(
    (state) => state.administrationEditReducer.groupNameValue
  );
  const description = useSelector((state) => state.administrationEditReducer.description);
  const policyIds = useSelector((state) => state.administrationListReducer.groupId);

  const methods = useForm<IEditFormValue>({
    resolver: yupResolver(adminEditSchema),
  });
  const isSuperAdmin = can('manage', 'all');

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = methods;

  const onSubmit = (data: IEditFormValue) => {
    dispatch(setGroupNameValue(data));
    dispatch(setOpenConfirmModal(true));
  };

  useEffect(() => {
    // @ts-ignore
    setValue('groupName', groupDetail?.name);
    // @ts-ignore
    setValue('description', groupDetail?.description);
    // @ts-ignore
    dispatch(setStatus(groupDetail?.status));
    // @ts-ignore
  }, [groupDetail?.name, groupDetail?.description, groupDetail?.status]);

  return (
    <>
      <HeaderBreadcrumbs
        heading={'Administration Edit'}
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Administration', href: PATH_DASHBOARD.general.administrationList },
          { name: t('edit') },
        ]}
      />
      <Box
        sx={{
          borderRadius: '16px',
          marginTop: '68px',
          boxShadow: boxShadowForEditForm,
          padding: '15px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Box sx={{ height: '60px' }}>
            <Controller
              name="groupName"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    name="groupName"
                    value={value}
                    onChange={onChange}
                    sx={{ width: '571px' }}
                    label={t('groupName')}
                  />
                );
              }}
            />
            {errors?.groupName && (
              <Typography sx={{ marginTop: '10px' }} color="error.main">
                {errors?.groupName?.message}
              </Typography>
            )}
          </Box>
          <Box sx={{ height: '60px' }}>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  id="outlined-disabled"
                  name="description"
                  onChange={onChange}
                  value={value}
                  sx={{ width: '433px' }}
                  label={t('description')}
                />
              )}
            />
            {errors?.description && (
              <Typography sx={{ marginTop: '10px' }} color="error.main">
                {errors?.description?.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: '40px',
          }}
        >
          <TextField
            select
            label={t('status')}
            value={status}
            onChange={(e) => {
              dispatch(setStatus(e.target.value as string));
            }}
            sx={{
              width: '571px',
              height: '56px',
              textTransform: 'capitalize',
            }}
          >
            {optionsStatus.map(
              (option: { name: string; value: string }, index: number) => (
                <MenuItem
                  key={index}
                  value={option.value}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {option?.name}
                </MenuItem>
              )
            )}
          </TextField>
          <FormControl>
            <TextField
              sx={{ width: '433px' }}
              disabled
              label={t('creationDate')}
              // @ts-ignore
              value={formatDate(groupDetail?.createdAt)}
            />
          </FormControl>
        </Box>
      </Box>
      {isSuperAdmin && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleSubmit(onSubmit)}
            sx={{ marginTop: '37px' }}
            variant="contained"
          >
            {t('saveChanges')}
          </Button>
        </Box>
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          isOpen={isOpenConfirmModal}
          onClose={() => dispatch(setOpenConfirmModal(false))}
          onConfirm={() => {
            mutate(
              {
                key,
                name: groupNameValue,
                description,
                policiesIds: policyIds,
                status,
              },
              {
                onSuccess: () => {
                  showSuccessSnackbar(t('successfullEditGroup'));
                  navigate(PATH_DASHBOARD.general.administrationList);
                },
                onError: () => {
                  showErrorSnackbar(t('failedEditGroup'));
                },
              }
            );
            dispatch(setOpenConfirmModal(false));
          }}
          title={t('saveChanges')}
          content={t('confirmSaveChanges')}
          contentConfirmBtn={t('save')}
          bgColorConfirmBtn="primary.main"
        />
      )}
    </>
  );
}
