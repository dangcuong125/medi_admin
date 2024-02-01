import { Card, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

const ViewDetailUserLoadingSkeleton = () => {

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
                    <Skeleton variant='text' height={"50px"} />
                    <Skeleton variant='text' height={"50px"} />
                    <Skeleton variant='text' height={"50px"} />
                    <Skeleton variant='text' height={"50px"} />
                </Stack>
            </Card>
        </>
    );
};

export default ViewDetailUserLoadingSkeleton;
