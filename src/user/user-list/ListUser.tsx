import {
    Box,
    Card,
    FormControlLabel,
    Switch,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
} from '@mui/material';
import React, { useEffect } from 'react';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useNavigate } from 'react-router-dom';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom, TableNoData } from 'src/common/components/table';
import { IUserParams, IUserRow } from '../interface';
import UserTableRow from './components/UserTableRow';
import { TABLE_HEAD } from '../constants';
import useTable from 'src/common/hooks/useTable';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import UserTableToolbar from './components/UserTableToolbar';
import { useGetUser } from '../hooks/useGetUser';
import { useSelector } from 'src/common/redux/store';
import { selectSearchFilterUser, selectSearchRoleUser } from '../user.slice';
import useMessage from '../../common/hooks/useMessage';
import UserTableLoadingSkeleton from './components/UserTableLoadingSkeleton';
import useLocales from 'src/common/hooks/useLocales';

const UserListDashboard = () => {
    const navigate = useNavigate();
    const searchText = useSelector(selectSearchFilterUser);
    const searchBy = useSelector(selectSearchRoleUser);
    const { showErrorSnackbar } = useMessage();
    const { translate } = useLocales();
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();
    const searchParams: IUserParams = searchBy === 'All' ? {
        page: page + 1,
        limit: rowsPerPage,
        searchText
    } : {
        page: page + 1,
        limit: rowsPerPage,
        searchText, searchBy
    };
    const { data, isLoading } = useGetUser({
        params: {
            ...searchParams,
        },
        callback: {
            onSuccess: () => { },
            onError: () => showErrorSnackbar('Get list user failed'),
        },
    });
    const storeData = data?.items || [];
    const { isCheckedAll, selectedIds, handleSelectItem, handleCheckAll } =
        useSelectMultiple(
            storeData?.map((item) => item.id),
            page + 1
        );

    const isNotFound = !isLoading && !data?.items.length;
    const totalRecords: number = data?.meta.totalItem || 0;
    const handleViewRow = (id: number) => {
        navigate(PATH_DASHBOARD.user.view(id));
    };
    const handleSetPage = () => {
        setPage(0);
    };
    return (
        <>
            <HeaderBreadcrumbs
                heading="User List"
                links={[
                    { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
                    { name: 'User', href: PATH_DASHBOARD.user.root },
                    { name: 'List' },
                ]}
            />
            <Card sx={{ p: '10px', w: '100%' }}>
                <UserTableToolbar onSetPage={handleSetPage} />
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                        <Table size={dense ? 'small' : 'medium'}>
                            <TableHeadCustom
                                order={order}
                                orderBy={orderBy}
                                isSelectAll={isCheckedAll}
                                headLabel={TABLE_HEAD}
                                rowCount={storeData.length}
                                numSelected={selectedIds.length}
                                onSort={onSort}
                                onSelectAllRows={handleCheckAll}
                            />

                            <TableBody>
                                {!isLoading &&
                                    storeData?.map((row: IUserRow) => (
                                        <UserTableRow
                                            key={row.id}
                                            row={row}
                                            selected={selectedIds.includes(row.id)}
                                            onSelectRow={(e) => {
                                                handleSelectItem(row.id, e);
                                            }}
                                            onViewRow={() => handleViewRow(row.id)}
                                        />
                                    ))}
                                {isLoading &&
                                    Array.from(Array(rowsPerPage)).map((_, index) => (
                                        <UserTableLoadingSkeleton key={index} isNotFound={isLoading} />
                                    ))}
                                <TableNoData isNotFound={isNotFound} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
                <Box sx={{ position: 'relative' }}>
                    {data?.meta?.totalPage && (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={totalRecords}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />
                    )}

                    <FormControlLabel
                        control={<Switch checked={dense} onChange={onChangeDense} />}
                        label="Dense"
                        sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
                    />
                </Box>
            </Card>
        </>
    );
};

export default UserListDashboard;
