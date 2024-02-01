import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import _debounce from 'lodash/debounce';
import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'src/common/redux/store';
import {
    resetSearchUser,
    searchFilterChange,
    searchRoleChange,
    selectSearchRoleUser,
} from 'src/user/user.slice';
import useLocales from 'src/common/hooks/useLocales';

type Props = {
    onSetPage: () => void;
};

const UserTableToolbar = ({ onSetPage }: Props) => {
    const searchRole = useSelector(selectSearchRoleUser);
    const dispatch = useDispatch();
    const { translate } = useLocales();
    const searchFilterRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        return () => {
            dispatch(resetSearchUser());
        };
    }, [dispatch]);
    const handleSearchRoleChange = (event: SelectChangeEvent) => {
        dispatch(searchRoleChange(event.target.value));
    };
    const handleSearchFilterChange = _debounce(() => {
        dispatch(
            searchFilterChange(
                searchFilterRef?.current?.value ? searchFilterRef?.current?.value : ''
            )
        );
        onSetPage();
    }, 500);

    return (
        <Stack
            spacing={'16px'}
            direction={{ xs: 'column', sm: 'row' }}
            px={'24px'}
            py={'20px'}
            alignItems={'center'}
        >
            <FormControl sx={{ minWidth: { xs: '100%', sm: '347px' } }}>
                <InputLabel id="select-role">{translate('search')}</InputLabel>
                <Select
                    labelId="select-role"
                    id="select-role"
                    value={searchRole}
                    label="Search by"
                    onChange={handleSearchRoleChange}
                    defaultValue={'All'}
                    sx={{ textTransform: "capitalize" }}
                >
                    <MenuItem value={'All'} sx={{ display: 'none', textTransform: 'capitalize' }}>
                        {translate('all')}
                    </MenuItem>
                    <MenuItem value={'PHONE'} sx={{ textTransform: 'capitalize' }}>
                        {translate("phone")}
                    </MenuItem>
                    <MenuItem value={'MERCHANT_NAME'} sx={{ textTransform: 'capitalize' }}>
                        {translate("merchant_name")}
                    </MenuItem>
                    <MenuItem value={'EMAIL'} sx={{ textTransform: 'capitalize' }}>
                        {translate("email")}
                    </MenuItem>
                </Select>
            </FormControl>
            <Box width={'100%'}>
                <TextField
                    placeholder={translate("search")}
                    inputProps={{ 'aria-label': 'search user' }}
                    onChange={handleSearchFilterChange}
                    fullWidth
                    inputRef={searchFilterRef}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Stack>
    );
};

export default UserTableToolbar;
