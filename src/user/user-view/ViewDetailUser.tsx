import { Card, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useGetUserById } from '../hooks/useGetUserById';
import useMessage from 'src/common/hooks/useMessage';
import ViewDetailUserLoadingSkeleton from './components/ViewDetailUserLoadingSkeleton';

const ViewDetailUser = () => {
    const params = useParams()
    const { showErrorSnackbar } = useMessage();
    const { data, isLoading } = useGetUserById({
        id: parseInt(params?.id as string), callback: {
            onSuccess: () => { },
            onError: () => showErrorSnackbar("Get user fail")
        }
    })
    if (isLoading) return <ViewDetailUserLoadingSkeleton />
    return (
        <>
            <HeaderBreadcrumbs
                heading="User List"
                links={[
                    { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
                    { name: 'User', href: PATH_DASHBOARD.user.root },
                    { name: 'View' },
                ]}
            />
            <Card sx={{ p: "30px" }}>
                <Stack spacing={"20px"}>
                    <TextField value={data?.email} label="Email Address" disabled />
                    <TextField value={data?.phoneNumber} label="Phone Number" disabled />
                    <TextField value={data?.address} label="Address" disabled />
                    <TextField value={data?.fullName} label="Creation Merchant" disabled />
                </Stack>
            </Card>
        </>
    );
};

export default ViewDetailUser;
