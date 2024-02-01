import React from 'react'
import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import useLocales from 'src/common/hooks/useLocales';
import useSettings from 'src/common/hooks/useSettings';
import AdministrationHeader from './AdministrationHeader';
import AdministrationForm from './AdministrationForm';
import ModalConfirmCreate from './ModalConfirmCreate';


const AdministrationCreateGroup = () => {
    const { themeStretch } = useSettings();
    const { translate } = useLocales()
    return (
        <Page title={translate("Administration")}>
            <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
                <AdministrationHeader />
                <AdministrationForm />
                <ModalConfirmCreate />
            </Container>
        </Page>
    )
}

export default AdministrationCreateGroup;
