import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';
// logo
import LogoOnlyLayout from '../../common/layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../common/routes/paths';
// components
import Page from '../../common/components/Page';
// sections
import ForgotPasswordForm from './component/ForgotPasswordForm';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  return (
    <Page title="Forgot Password">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            Please enter the email address associated with your account and We will email you a link
            to reset your password.
          </Typography>

          <ForgotPasswordForm />

          <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
            Back
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
