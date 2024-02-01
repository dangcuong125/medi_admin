import { Button, Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import Page from 'src/common/components/Page';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useSettings from 'src/common/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import AdminEditForm from '../admin-edit/edit-form/AdminEditForm';

export default function AdminEdit() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin: Edit">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <HeaderBreadcrumbs
          heading="Admin Details"
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: BREADCUMBS.ADMIN, href: PATH_DASHBOARD.general.app },
          ]}
        />
        <AdminEditForm />
      </Container>
    </Page>
  );
}
