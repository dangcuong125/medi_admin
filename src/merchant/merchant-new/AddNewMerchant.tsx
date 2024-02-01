import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { AddNewMerchantForm } from './component/AddNewMerchantForm';

export default function AddNewAdminDashboard() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Tạo mới admin"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.MERCHANTS_LIST, href: PATH_DASHBOARD.merchant.root },
          { name: 'Tạo mới merchant' },
        ]}
      />
      <AddNewMerchantForm />
    </>
  );
}
