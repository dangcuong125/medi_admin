import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Iconify from '../../common/components/Iconify';
import Scrollbar from '../../common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from '../../common/components/table';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { useSelectMultiple } from '../../common/hooks/useSelectMultiple';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useTable from '../../common/hooks/useTable';
import { useDispatch, useSelector } from '../../common/redux/store';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import {
  filterNameSelector,
  filterRankSelector,
  filterStatusSelector,
  selectedIdsSelector,
  deleteModalSelector,
  confirmedDeleteSelector,
  setFilterName,
  setFilterRank,
  setFilterStatus,
  setDeleteModal,
  setSelectedIds,
  setConfirmedDelete,
} from '../reducer/merchant.slice';
import { TABLE_HEAD } from '../constant/merchant.constant';
import { useDeleteMerchantById } from '../hooks/useDeleteMerchantById';
import { useGetMerchants } from '../hooks/useGetMerchants';
import { IMerchantParams, IFormMerchant } from '../interface/merchant.interface';
import { MerchantTableRow } from './component/MerchantTableRow';
import MerchantToolbar from './component/MerchantToolbar';
import useMessage from '../../common/hooks/useMessage';
import useDebounce from 'src/common/hooks/useDebounce';
import TableSkeleton from './component/TableSkeleton';
import { ConfirmModal } from 'src/common/components/modal/ConfirmModal';
import { useTranslation } from 'react-i18next';
function MerchantListDashboard() {
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
  const dispatch = useDispatch();

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { t } = useTranslation();
  const { useDeepCompareEffect } = useDeepEffect();
  const filterName = useSelector(filterNameSelector);
  const filterStatus = useSelector(filterStatusSelector);
  const filterRank = useSelector(filterRankSelector);
  const openEditModal = useSelector(deleteModalSelector);
  const confirmDelete = useSelector(confirmedDeleteSelector);
  const { mutate } = useDeleteMerchantById({
    onSuccess: () => {
      showSuccessSnackbar(t('delete_merchant_success'));
    },
    onError: () => {
      showErrorSnackbar(t('delete_merchant_fail'));
    },
  });

  const searchParams: IMerchantParams = {
    page: page + 1,
    limit: rowsPerPage,
  };
  const handleFilterName = (filterName: string) => {
    dispatch(setFilterName(filterName));
    setPage(0);
  };

  const handleFilterStatus = (filterStatus: string) => {
    dispatch(setFilterStatus(filterStatus));
    setPage(0);
  };

  const handleFilterRank = (filterRank: string) => {
    dispatch(setFilterRank(filterRank));
    setPage(0);
  };

  const handleCloseDeleteModal = () => dispatch(setDeleteModal(false));
  const handleOpenDeleteModal = () => dispatch(setDeleteModal(true));
  const selectedIdsValue = useSelector(selectedIdsSelector);
  const debouncedFilterName = useDebounce<string>(filterName, 500);
  const debouncedFilterStatus = useDebounce<string>(filterStatus, 500);
  const debouncedFilterRank = useDebounce<string>(filterRank, 500);

  if (debouncedFilterName.length > 2) searchParams.searchText = debouncedFilterName;
  if (debouncedFilterStatus) searchParams.status = debouncedFilterStatus;
  if (debouncedFilterRank) searchParams.rank = debouncedFilterRank;
  const { data, isLoading } = useGetMerchants({
    ...searchParams,
  });
  const listMerchants = data?.items || [];
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(
    listMerchants.map((item) => item.id),
    page + 1
  );
  const handleConfirmDelete = () => {
    dispatch(setConfirmedDelete(true));
  };
  const handleDeleteRows = (ids: number[]) => {
    handleOpenDeleteModal();
    dispatch(setSelectedIds(ids));
    resetSelect();
  };

  useDeepCompareEffect(() => {
    if (confirmDelete) {
      for (const idValue of selectedIdsValue) {
        mutate(idValue);
      }
      dispatch(setConfirmedDelete(false));
      dispatch(setSelectedIds([]));
    }
  }, [confirmDelete, selectedIdsValue]);

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.merchant.edit(id));
  };

  const { totalItems } = data?.meta || {
    totalItems: 0,
  };
  const isNotFound = !isLoading && !listMerchants.length;
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('list_merchants')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: t('list_merchants') },
        ]}
      />
      <Card>
        <Divider />
        <ConfirmModal
          open={openEditModal}
          handleClose={() => {
            handleCloseDeleteModal();
          }}
          handleOnAgree={() => handleConfirmDelete()}
          type={t('delete_merchant')}
          colorType={false}
        />
        <MerchantToolbar
          filterName={filterName}
          onFilterName={handleFilterName}
          filterRank={filterRank}
          onFilterRank={handleFilterRank}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterStatus}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={listMerchants.length}
                onSelectAllRows={handleCheckAll}
                actions={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={handleOpenDeleteModal}>
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
                isSelectAll={isCheckedAll}
                headLabel={TABLE_HEAD}
                rowCount={listMerchants.length}
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {listMerchants.map((row: IFormMerchant) => (
                  <MerchantTableRow
                    key={row.id}
                    row={row}
                    selected={selectedIds.includes(row.id)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.id, e);
                    }}
                    onDeleteRow={() => handleDeleteRows([row.id])}
                    onEditRow={() => {
                      handleEditRow(row.id);
                    }}
                  />
                ))}
                <TableSkeleton isLoading={isLoading} row={rowsPerPage} />;
                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalItems}
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
      </Card>
    </>
  );
}

export default MerchantListDashboard;
