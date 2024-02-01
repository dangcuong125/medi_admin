import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Paper, Autocomplete } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { adminCreateGroupSchema } from '../adminCreateGroup.schema';
import { defaultGroupPolicy } from '../constant';
import { useGetPolicies } from '../hooks/useGetPolicies';
import { IPostGroupPolicy, IResPolicies } from '../interface';
import { setDescriptionPolicy, setNameGroupPolicy, setPoliciesIds, setConfirmPopup } from '../reducer';

const AdministrationForm = () => {
    const navigate = useNavigate();
    const data = useGetPolicies();
    const listPolicies = data?.data || [];
    const dispatch = useDispatch();
    const { t } = useTranslation()

    const methods = useForm<IPostGroupPolicy>({
        resolver: yupResolver(adminCreateGroupSchema),
        defaultValues: defaultGroupPolicy
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const handleChangePolicies = (event: React.ChangeEvent<{}>, value: IResPolicies[]) => {
        dispatch(setPoliciesIds(value.map((item) => item?.id)));
    };

    const onSubmit = (data: IPostGroupPolicy) => {
        dispatch(setNameGroupPolicy(data.name))
        dispatch(setDescriptionPolicy(data.description))
        dispatch(setConfirmPopup(true))
    };

    return (
        <>
            <Paper elevation={3}>
                <Container sx={{ padding: '25px' }}>
                    <Grid container direction="column" justifyContent="space-between">
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <RHFTextField
                                name="name"
                                label="Name"
                                InputLabelProps={{ shrink: true }}
                                placeholder="Group Name"
                            />
                            <RHFTextField
                                sx={{ margin: '25px 0 25px 0' }}
                                name="description"
                                label="Description"
                                InputLabelProps={{ shrink: true }}
                                placeholder="Description Group Policy"
                            />
                            <Autocomplete
                                multiple
                                limitTags={5}
                                id="multiple-limit-tags"
                                options={listPolicies}
                                getOptionLabel={(option) => {
                                    return option?.name;
                                }}
                                onChange={handleChangePolicies}
                                renderInput={(params) => (
                                    <RHFTextField {...params} label="Group Policy" name="policiesIds" />
                                )}
                            />
                            <Stack direction="row" justifyContent="flex-end" mt={5} spacing={3}>
                                <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={() => {
                                        navigate(PATH_DASHBOARD.general.administrationList);
                                    }}
                                >
                                    {t('cancel')}
                                </Button>
                                <Button variant="contained" type="submit">
                                    {t('create_group_policy')}
                                </Button>
                            </Stack>
                        </FormProvider>
                    </Grid>
                </Container>
            </Paper>
        </>
    );
};

export default AdministrationForm;
