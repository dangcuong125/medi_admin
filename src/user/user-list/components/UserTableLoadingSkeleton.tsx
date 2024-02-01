import { Skeleton, TableCell, TableRow } from '@mui/material';
import React from 'react';

type Props = {
    isNotFound: boolean;
};

const UserTableLoadingSkeleton = ({ isNotFound }: Props) => {
    return (
        <TableRow>
            {isNotFound ? (
                <>
                    <TableCell align="left">
                        <Skeleton height={'37px'} />
                    </TableCell>
                    <TableCell align="left">
                        <Skeleton height={'37px'} />
                    </TableCell>
                    <TableCell align="left">
                        <Skeleton height={'37px'} />
                    </TableCell>
                    <TableCell align="left">
                        <Skeleton height={'37px'} />
                    </TableCell>
                    <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                        <Skeleton height={'37px'} />
                    </TableCell>
                    <TableCell align="left">
                        <Skeleton height={'37px'} />
                    </TableCell>
                </>
            ) : (
                <TableCell colSpan={12} sx={{ p: 0 }} />
            )}
        </TableRow>
    );
};

export default UserTableLoadingSkeleton;
