import { Box } from '@mui/material';
import AdministrationHeader from './AdministrationHeader';
import AdministrationSearch from './AdministrationSearch';
import AdministrationTable from './AdministrationTable';

export default function AdministrationContainer() {
  return (
    <Box ml="40px">
      <AdministrationHeader />
      <AdministrationSearch />
      <AdministrationTable />
    </Box>
  );
}
