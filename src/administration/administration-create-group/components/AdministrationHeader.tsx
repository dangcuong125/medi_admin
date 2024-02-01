import { Box } from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useTranslation } from 'react-i18next';

export default function AdministrationHeader() {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <HeaderBreadcrumbs
                    heading={'Administration Create Group'}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Administration', href: PATH_DASHBOARD.general.administrationList },
                        { name: t('Create') },
                    ]}
                />
            </Box>
        </Box>
    );
}
