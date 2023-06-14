//로그인 contents
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import AuthWrapper from './AuthWrapper';
import LoginForm from './auth-forms/LoginForm';

// ================================|| LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'baseline', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="BLACK">
              회원가입
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'baseline', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">
              로그인
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <LoginForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;