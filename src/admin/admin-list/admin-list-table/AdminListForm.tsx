import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import * as lodash from 'lodash';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  filterNameSelector,
  setConfirmPopup,
  setFilterName,
  setSelectIdsAdmin,
  statusSearch,
} from 'src/admin/admin.slice';
import { TABLE_ADMIN_HEAD } from 'src/admin/constant';
import { useGetAdmin } from 'src/admin/hooks/useGetAdmin';
import { IAdminParams } from 'src/admin/interface';
import Iconify from 'src/common/components/Iconify';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useDebounce from 'src/common/hooks/useDebounce';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { dispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import AdminSearch from '../AdminSearch';
import AdminSkeletonTable from '../AdminSkeletonTable';
import AdminStatusSearch from '../AdminStatusSearch';
import ModalConfirmDelete from '../ModalConfirmDelete';
import AdminListTableRow from './AdminListTableRow';

export default function AdminListForm() {
  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setSelected,

    selected: selectedRows,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const filterName = useSelector(filterNameSelector);
  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
  };

  const debouncedFilterName = useDebounce<string  | undefined>(filterName, 500);
  const statusSearchValue = useSelector(statusSearch)

  const searchParams: IAdminParams = {
    status: statusSearchValue,
    page: page + 1,
    limit: rowsPerPage,
    searchText: debouncedFilterName,
  };

  const { data, isLoading } = useGetAdmin({ ...searchParams });
  const listAdmin = data?.items || [];

  const currentPage = data?.meta.currentPage
  
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listAdmin.map((item) => item.id),
    page + 1
  );

  const totalItems = data?.meta.totalItems;

  const handleDeleteRows = (ids: number[]) => {
    dispatch(setSelectIdsAdmin(ids));
    dispatch(setConfirmPopup(true));
    resetSelect();
  };

  const handleEditAdmin = (id: number) => {
    navigate(PATH_DASHBOARD.admin.edit(id));
  };

  const isNotFound = !listAdmin.length && !isLoading;
  return (
    <>
      <Paper elevation={3}>
        <ModalConfirmDelete />
        <Stack direction="row" spacing={2} sx={{padding: '20px'}}>
            <AdminStatusSearch />
            <AdminSearch filterName={filterName} onChangeFilterName={handleFilterName} />
          </Stack>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          {!!selectedIds.length && (
            <TableSelectedActions
              dense={dense}
              isSelectAll={isCheckedAll}
              numSelected={selectedIds.length}
              rowCount={listAdmin.length}
              onSelectAllRows={handleCheckAll}
              actions={
                <Tooltip title="Delete">
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteRows(selectedIds)}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                  </IconButton>
                </Tooltip>
              }
            />
          )}
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              rowCount={listAdmin.length}
              numSelected={selectedIds.length}
              onSort={onSort}
              isSelectAll={isCheckedAll}
              onSelectAllRows={handleCheckAll}
              headLabel={TABLE_ADMIN_HEAD}
            />

            <TableBody>
              {listAdmin.map((row) => (
                <AdminListTableRow
                  key={row.id}
                  row={row}
                  selected={selectedIds.includes(row.id)}
                  onEditRow={() => handleEditAdmin(row.id)}
                  onSelectRow={(e) => handleSelectItem(row.id, e)}
                  onDeleteRow={() => handleDeleteRows([row.id])}
                />
              ))}
              {/* {Array.from(Array(rowsPerPage)).map((index) => {
                  return <AdminSkeletonTable key={index} isNotFound={isLoading} />;
                })} */}
              <AdminSkeletonTable isNotFound={isLoading} />
              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={lodash.isEmpty(totalItems) ? (totalItems as number) : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Paper>
    </>
  );
}
