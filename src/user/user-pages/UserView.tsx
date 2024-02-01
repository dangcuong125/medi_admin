import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useLocales from 'src/common/hooks/useLocales';
import useSettings from 'src/common/hooks/useSettings';
import ViewDetailUser from '../user-view/ViewDetailUser';

export default function UserView() {
    const { themeStretch } = useSettings();
    const { translate } = useLocales()
    return (
        <Page title={translate("manage_user")}>
            <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
                <ViewDetailUser />
            </Container>
        </Page>
    );
}
