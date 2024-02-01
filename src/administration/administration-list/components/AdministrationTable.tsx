import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TablePagination,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import GridMoreVertIcon from '@mui/icons-material/MoreVert';
import {
  setAdminId,
  setIsOpenDeleteMultipleAdminModal,
  setMenuItemSelected,
  setOpenDeleteModal,
  setPickedAdminIds,
} from '../reducer';
import { useDispatch, useSelector } from 'src/common/redux/store';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetGroupList } from '../hooks/useGetAdminList';
import { formatDate, replacePathParams } from 'src/common/constants/common.utils';
import { IAdminList } from '../interface';
import { useTranslation } from 'react-i18next';
import { useDeleteGroupById } from '../hooks/useDeleteAdminById';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import ConfirmModal from './ConfirmModal';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { useEffect } from 'react';
import can from 'src/common/casl/defineAbility';
import useMessage from 'src/common/hooks/useMessage';

const isDisabled = false;
const optionChangeRowsPerPage = [5, 10, 15];
const firstPage = 0;

const bgColorForActiveStatus = 'rgba(84, 214, 44, 0.16);';
const bgColorForBannedStatus = 'rgba(255, 72, 66, 0.16);';
const statusActive = 'ACTIVE';

export default function AdministrationTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const menuItemSelected = useSelector(
    (state) => state.administrationListReducer.menuItemSelected
  );
  const inputValueSearch = useSelector(
    (state) => state.administrationListReducer.searchInputValue
  );
  const isOpenDeleteModal = useSelector(
    (state) => state.administrationListReducer.isOpenDeleteModal
  );
  const status = useSelector((state) => state.administrationListReducer.status);
  const groupKey = useSelector((state) => state.administrationListReducer.adminId);
  const pickedAdminIds = useSelector(
    (state) => state.administrationListReducer.pickedAdminIds
  );
  const isOpenDeleteMultipleAdminModal = useSelector(
    (state) => state.administrationListReducer.isOpenDeleteMultipleAdminModal
  );
  const isSuperAdmin = can('manage', 'all');

  const { mutate } = useDeleteGroupById();
  const { data } = useGetGroupList(inputValueSearch, status, page + 1, rowsPerPage);
  // @ts-ignore
  const adminList = data?.items;
  const isDisableBackBtn = page === firstPage && !isDisabled;
  const isDisableNextBtn =
    // @ts-ignore
    data?.meta?.currentPage === data?.meta?.totalPages && !isDisabled;

  const { handleCheckAll, isCheckedAll, handleSelectItem, selectedIds } =
    useSelectMultiple(pickedAdminIds, page + 1);

  const handleClick = (e: React.MouseEvent<HTMLElement>, adminId: string) => {
    dispatch(setAdminId(adminId));
    dispatch(setMenuItemSelected(e.currentTarget as HTMLElement));
  };

  useEffect(() => {
    dispatch(setPickedAdminIds(adminList));
  }, [adminList]);

  return (
    <TableContainer>
      <Table
        sx={{
          marginTop: '20px',
          boxShadow:
            '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12);',
        }}
        aria-label="simple table"
      >
        <TableHead sx={{ backgroundColor: selectedIds.length && '#C8FACD' }}>
          <TableRow>
            <TableCell sx={{ width: '0px' }}>
              <Checkbox
                checked={isCheckedAll}
                onChange={(e) => handleCheckAll(e.target.checked)}
              />
            </TableCell>
            <TableCell align="left">
              {!selectedIds?.length ? t('name') : `${selectedIds?.length} selected`}
            </TableCell>
            <TableCell align="left">{t('creationDate')}</TableCell>
            <TableCell align="left">{t('status')}</TableCell>
            <TableCell align="left"></TableCell>
            {/* <TableCell align="left" sx={{ width: '0px' }}>
              {selectedIds.length ? (
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(setIsOpenDeleteMultipleAdminModal(true));
                  }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              ) : (
                ''
              )}
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {adminList?.map((admin: IAdminList, index: number) => {
            const isChecked = selectedIds?.includes(admin?.key);
            return (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox
                    defaultChecked={false}
                    checked={isChecked}
                    onChange={(e) => handleSelectItem(admin?.key, e.target.checked)}
                  />
                </TableCell>
                <TableCell align="left">{admin.name}</TableCell>
                <TableCell align="left">
                  {formatDate(admin.createdAt, 'DD/MM/YYYY')}
                </TableCell>
                <TableCell align="left">
                  <Chip
                    label={admin.status === statusActive ? 'ACTIVE' : 'BANNED'}
                    sx={{
                      borderRadius: '6px',
                      color:
                        admin?.status === statusActive ? 'success.dark' : 'error.dark',
                      fontWeight: 700,
                      fontSize: '12px',
                      backgroundColor:
                        admin?.status === statusActive
                          ? bgColorForActiveStatus
                          : bgColorForBannedStatus,
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <Box>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={menuItemSelected ? 'long-menu' : undefined}
                      aria-expanded={menuItemSelected ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClick(e, admin?.key)}
                    >
                      <GridMoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={menuItemSelected}
                      open={!!menuItemSelected}
                      onClose={() => dispatch(setMenuItemSelected(null))}
                      PaperProps={{
                        style: {
                          width: '129px',
                        },
                      }}
                    >
                      <MenuItem
                        selected={false}
                        value="edit"
                        onClick={() => {
                          navigate(
                            replacePathParams(PATH_DASHBOARD.general.administrationEdit, {
                              key: groupKey,
                            })
                          );
                          dispatch(setMenuItemSelected(null));
                        }}
                      >
                        <EditIcon fontSize="small" />
                        <Typography sx={{ marginLeft: '19.33px' }}>
                          {t('edit')}
                        </Typography>
                      </MenuItem>
                      {isSuperAdmin && (
                        <MenuItem
                          value="delete"
                          selected={false}
                          onClick={() => {
                            dispatch(setOpenDeleteModal(true));
                            dispatch(setMenuItemSelected(null));
                          }}
                        >
                          <DeleteIcon sx={{ color: 'error.main' }} fontSize="small" />
                          <Typography sx={{ color: 'error.main', marginLeft: '19.33px' }}>
                            {t('delete')}
                          </Typography>
                        </MenuItem>
                      )}
                    </Menu>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        // @ts-ignore
        count={data?.meta?.totalItems}
        page={page}
        rowsPerPageOptions={optionChangeRowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        backIconButtonProps={{
          disabled: isDisableBackBtn,
        }}
        nextIconButtonProps={{
          disabled: isDisableNextBtn,
        }}
      />
      {isOpenDeleteModal && (
        <ConfirmModal
          isOpen={isOpenDeleteModal}
          onClose={() => {
            dispatch(setOpenDeleteModal(false));
          }}
          onConfirm={() => {
            dispatch(setOpenDeleteModal(false));
            mutate(groupKey, {
              onSuccess: () => {
                showSuccessSnackbar(t('successfullyDelete'));
              },
              onError: () => {
                showErrorSnackbar(t('errorDelete'));
              },
            });
          }}
          title={t('delete')}
          content={t('confirmDelete')}
          contentConfirmBtn={t('delete')}
          bgColorConfirmBtn="warning.confirm"
        />
      )}
      {isOpenDeleteMultipleAdminModal && (
        <ConfirmModal
          isOpen={isOpenDeleteMultipleAdminModal}
          onClose={() => {
            dispatch(setIsOpenDeleteMultipleAdminModal(false));
          }}
          onConfirm={() => {
            dispatch(setIsOpenDeleteMultipleAdminModal(false));
            // deleteMultipleAdmin({ ids: selectedIds });
          }}
          title={t('delete')}
          content={t('confirmDelete') + ' ' + selectedIds.length + ' item?'}
          contentConfirmBtn={t('delete')}
          bgColorConfirmBtn="warning.confirm"
        />
      )}
    </TableContainer>
  );
}
