//회원가입 contents

import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import JoinForm from './auth-forms/JoinForm'

// ================================|| REGISTER ||================================ //

const Register = () => (
    <AuthWrapper>
        <Grid container spacing={3} >
            <Grid item xs={12} >
                {/* 로그인 페이지로 이동 */}
            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography component={Link} to="/" variant="body1" sx={{ textDecoration: 'none', ml: 'auto',  justifyContent: 'flex-end'  }} color="">
                        이미 회원이신가요?
                    </Typography>
                    </Stack>
                    {/* 회원가입 title */}
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography  variant="h3" >회원가입</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                {/* 회원가입 Form */}
                <JoinForm/>
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default Register;
