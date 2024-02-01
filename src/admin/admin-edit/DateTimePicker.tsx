import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useSelector } from 'react-redux';
import { createdDate, setCreatedDate } from '../admin.slice';
import { dispatch } from 'src/common/redux/store';
import { t } from 'i18next';
import en from '../../common/locales/en';
import { InputAdornment } from '@mui/material';
import Iconify from 'src/common/components/Iconify';

export default function BasicDateTimePicker() {
  const valueCreatedDate = useSelector(createdDate)
  const valueLabel = t(en.creationDate)
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(contentTag) => <TextField {...contentTag}  InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Iconify icon={'fluent-mdl2:field-read-only'} />
                <Iconify sx={{marginLeft: '7px'}} icon={'simple-line-icons:calender'} />
              </InputAdornment>
            ),
          }} sx={{ minWidth: 500 }}/>}
          label={valueLabel}
          inputFormat="DD/MM/YYYY, HH:mm"
          value={valueCreatedDate}
          onChange={(newValue) => {
            dispatch(setCreatedDate(newValue));
          }}
          readOnly
        />
      </LocalizationProvider>
    </>
  );
}
