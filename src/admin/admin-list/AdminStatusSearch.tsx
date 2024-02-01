import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { adminStatusSearch, defaultValueStatus } from 'src/admin/constant';
import { dispatch } from 'src/common/redux/store';
import { setStatusSearch } from '../admin.slice';
import en from '../../common/locales/en';
export default function AdminStatusSearch() {
  return (
    <FormControl>
    <InputLabel id='id-status-search'>{en.status}</InputLabel>
      <Select
        label="Status"
        labelId='id-status-search'
        id='id-status-search'
        sx={{ display: 'flex', flexGrow: '0.5', minWidth: '250px'}}
        defaultValue={adminStatusSearch[0]}
        onChange={(e) => {
            if(e.target.value !== defaultValueStatus){
                dispatch(setStatusSearch(e.target.value))
            } else {
                dispatch(setStatusSearch(undefined))
            }
        }}
      >
        {adminStatusSearch.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
  );
}
