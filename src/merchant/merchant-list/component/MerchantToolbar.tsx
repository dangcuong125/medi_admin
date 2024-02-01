import { InputAdornment, TextField, Grid, Card, MenuItem } from '@mui/material';
// components
import Iconify from 'src/common/components/Iconify';
import { statusOptions, merchantRankOptions } from '../../constant/merchant.constant';
// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (value: string) => void;
  filterStatus: string;
  onFilterStatus: (value: string) => void;
  filterRank: string;
  onFilterRank: (value: string) => void;
};

export default function MerchantToolbar({
  filterName,
  filterStatus,
  filterRank,
  onFilterName,
  onFilterStatus,
  onFilterRank,
}: Props) {
  return (
    <Card>
      <Grid container spacing={2} py="30px" ml="10px">
      <Grid item xs={10} md={3}>
          <TextField
            fullWidth
            value={filterStatus}
            onChange={(event) => onFilterStatus(event.target.value)}
            name="status"
            label="Status"
            select
          >
            <MenuItem value="">
              All
            </MenuItem>
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={10} md={3}>
        <TextField 
          fullWidth
          value={filterRank}
          onChange={(event) => onFilterRank(event.target.value)}
          name="merchantRank"
          label="Merchant Rank"
          select
        >
          <MenuItem value="">
              All
          </MenuItem>
          {merchantRankOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
        <Grid item xs={10} md={5} >
            <TextField
              fullWidth
              value={filterName}
              onChange={(event) => onFilterName(event.target.value)}
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
        </Grid>
      </Grid>
    </Card>
  );
}
