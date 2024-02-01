import { Checkbox, MenuItem, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import useLocales from 'src/common/hooks/useLocales';
import { fDateTimeSuffix } from 'src/common/utils/formatTime';
import { IPropsUserTableRow } from 'src/user/interface';

const UserTableRow = ({ row, selected, onViewRow, onSelectRow }: IPropsUserTableRow) => {
    const { id, address, email, phoneNumber, createAt } = row;
    const { translate } = useLocales()
    const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
    const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
        setOpenMenuActions(category.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };
    const tableCellSX = {
        textOverflow: 'ellipsis',
        maxWidth: '150px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    }
    return (
        <TableRow
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', borderRadius: '10px' }}
            hover
        >
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
            </TableCell>
            <TableCell align="left">{email}</TableCell>

            <TableCell align="left">{phoneNumber}</TableCell>

            <TableCell
                align="left"
                sx={tableCellSX}
            >
                {address}
            </TableCell>

            <TableCell align="left">{fDateTimeSuffix(createAt).split(' ')[0]}</TableCell>
            <TableCell align="right">
                <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                        <>
                            <MenuItem
                                onClick={() => {
                                    onViewRow();
                                    handleCloseMenu();
                                }}
                                sx={{ textTransform: "capitalize" }}
                            >
                                <Iconify icon={'eva:eye-fill'} />
                                {translate("view")}
                            </MenuItem>
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    );
};

export default UserTableRow;
