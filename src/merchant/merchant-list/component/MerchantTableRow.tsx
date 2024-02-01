import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Label from 'src/common/components/Label';
import { formatDate } from 'src/common/constants/common.utils';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import { IPropsAdminTableRow } from '../../interface/merchant.interface';

function MerchantTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsAdminTableRow) {
  const { id, email, createdAt, updatedAt, rank, status } = row;

  const { t } = useTranslation();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget)
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="left">{id}</TableCell>

      <TableCell align="left">{email}</TableCell>

      <TableCell align="left">{formatDate(createdAt)}</TableCell>

      <TableCell align="left">{formatDate(updatedAt)}</TableCell>

      <TableCell align="left">{rank}</TableCell>

      <TableCell align="left">
        <Label color={
          (status === 'BLOCK' && 'error') || 
          (status === 'ACTIVE' && 'success') ||
          (status === 'CHECKING' && 'warning') ||
          'default'
        }
          >
            {status}
          </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {t('edit')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                {t('delete')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}

export { MerchantTableRow };

