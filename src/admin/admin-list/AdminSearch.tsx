import { InputAdornment, TextField } from '@mui/material';
import Iconify from 'src/common/components/Iconify';
import { FilterAdminProps } from '../interface';

export default function AdminSearch({
  filterName,
  onChangeFilterName,
}: FilterAdminProps) {
  return (
    <>
      <TextField sx={{display:'flex', flexGrow: '1'}}
        label='Search'
        value={filterName}
        onChange={(e) => onChangeFilterName(e.target.value)}
        placeholder="Search name..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
