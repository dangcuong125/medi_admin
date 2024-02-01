import { Button, Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import Page from 'src/common/components/Page';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useSettings from 'src/common/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import AdminCreateForm from '../admin-create/create-form/AdminCreateForm';

export default function AdminCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin: Create">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create New Admin"
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: BREADCUMBS.ADMIN, href: PATH_DASHBOARD.general.app },
            { name: 'Create' },
          ]}
        />
        <AdminCreateForm />
      </Container>
    </Page>
  );
}
