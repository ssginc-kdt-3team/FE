import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import LoginForm from './auth-forms/LoginForm';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">로그인</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <LoginForm />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default Login;
