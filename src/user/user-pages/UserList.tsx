import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useLocales from 'src/common/hooks/useLocales';
import useSettings from 'src/common/hooks/useSettings';
import UserListDashboard from '../user-list/ListUser';

export default function UserList() {
    const { themeStretch } = useSettings();
    const { translate } = useLocales()
    return (
        <Page title={translate("manage_user")}>
            <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
                <UserListDashboard />
            </Container>
        </Page>
    );
}
