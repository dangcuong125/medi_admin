import { useNavigate, useParams } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import LoadingScreen from 'src/common/components/LoadingScreen';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import useMessage from 'src/common/hooks/useMessage';
import { dispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useGetMerchantById } from '../hooks/useGetMerchantById';
import { IFormMerchant } from '../interface/merchant.interface';
import { setMerchantDetail } from '../reducer/merchant.slice';
import { EditMerchantForm } from './component/EditMerchantForm';
import { useTranslation } from 'react-i18next';

export default function EditAdminDashboard() {
  const params = useParams();
  const { t } = useTranslation();
  const id = params?.id;
  const { useDeepCompareEffect } = useDeepEffect();
  const { showErrorSnackbar } = useMessage();
  const navigate = useNavigate();
  const { data, isLoading } = useGetMerchantById({
    id: parseInt(id as string),
    callback: {
      onSuccess: () => {},
      onError: () => {
        navigate(PATH_DASHBOARD.merchant.list, { replace: true });
        showErrorSnackbar(t('get_merchant_fail'));
      },
    },
  });
  const merchantDetail: IFormMerchant = data ? data : {} as IFormMerchant;
  useDeepCompareEffect(() => {
    dispatch(setMerchantDetail(merchantDetail));
  }, [merchantDetail]);
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('edit_merchant')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.merchant.root },
          { name: t('edit_merchant') },
        ]}
      />
      {isLoading && (<LoadingScreen/>)}
      <EditMerchantForm/>
    </>
  );
}
