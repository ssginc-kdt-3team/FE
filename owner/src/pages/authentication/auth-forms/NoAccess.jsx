import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, Button } from '@mui/material';

// project import
import AuthWrapper from '../AuthWrapper';
import LoginForm from '../auth-forms/LoginForm';

// ================================|| LOGIN ||================================ //

const NoAccess = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center', mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="body5" sx={{ textDecoration: 'none' }} color="">
                    스타필드 예약 시스템 점주 전용 홈페이지 입니다. 
                    </Typography>
                    <Typography variant="body5" sx={{ textDecoration: 'none' }} color="">
                     점주님만 로그인 후 이용가능합니다.
                    </Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'baseline', mb: { xs: -0.5, sm: 0.5 } }}>
                    <Button component={Link} to="/login" variant="h6" >
                        로그인
                    </Button>
                    </Stack>
            </Grid>
            {/* <Grid item xs={12}>
                <LoginForm />
            </Grid> */}
        </Grid>
    </AuthWrapper>
);

export default NoAccess;