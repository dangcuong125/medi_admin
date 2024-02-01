import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { IPropsAdminTable } from 'src/admin/interface';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { ActiveChip, BannedChip } from '../../admin-create/StatusChip';
import { formatDate } from 'src/common/constants/common.utils';

export default function AdminListTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsAdminTable) {
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell align="left">
          <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
        </TableCell>
        <TableCell align="left">{row.username}</TableCell>
        <TableCell align="left">{formatDate(row.createdAt)}</TableCell>
        <TableCell align="left">
          {row.status === 'ACTIVE' ? <ActiveChip /> : <BannedChip />}
        </TableCell>
        <TableCell align="left">
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
                  Edit
                </MenuItem>

                <MenuItem
                  sx={{ color: 'error.main' }}
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
