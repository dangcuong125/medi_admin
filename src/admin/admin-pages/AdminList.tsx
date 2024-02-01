import { Button, Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import Page from 'src/common/components/Page';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useSettings from 'src/common/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import AdminListForm from '../admin-list/admin-list-table/AdminListForm';
import { Link as RouterLink } from 'react-router-dom';

export default function AdminList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin: List">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách admin"
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: BREADCUMBS.ADMIN, href: PATH_DASHBOARD.general.app },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              to={PATH_DASHBOARD.admin.create}
              component={RouterLink}
            >
              New Admin
            </Button>
          }
        />
        <AdminListForm />
      </Container>
    </Page>
  );
}
