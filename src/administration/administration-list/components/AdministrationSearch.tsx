import { Box, InputAdornment, TextField, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { setValueInputSearch, setStatus } from '../reducer';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { useTranslation } from 'react-i18next';

const optionsStatus = [
  {
    name: 'ALL',
    value: 'ALL',
  },
  {
    name: 'ACTIVE',
    value: 'ACTIVE',
  },
  { name: 'BANNED', value: 'IN_ACTIVE' },
];

export default function AdministrationSearch() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const status = useSelector((state) => state.administrationListReducer.status);

  return (
    <Box
      sx={{
        marginTop: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <TextField
        select
        label={t('status')}
        defaultValue={status}
        onChange={(e) => {
          dispatch(setStatus(e.target.value as string));
        }}
        sx={{
          width: '266px',
          height: '56px',
          textTransform: 'capitalize',
        }}
      >
        {optionsStatus.map((option: { name: string; value: string }, index: number) => (
          <MenuItem
            key={index}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option?.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Search..."
        onChange={(e) => dispatch(setValueInputSearch(e.target.value))}
        sx={{ width: '750px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
