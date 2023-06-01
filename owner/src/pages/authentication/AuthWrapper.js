//로그인, 회원가입 배경

import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from 'components/Logo';

// // assets

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    //배경
    <Box sx={{ minHeight: '100vh' }}>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '100vh'
            }}
        >
            <Grid 
            item xs={12} 
            sx={{  mt: 5 }} 
            >
            {/* <div style={{ marginLeft: '620px'}} > */}
            <div>
             {/* 스타필드 로고 */}
                <Logo />
            </div>
            </Grid>
            {/* authcard wrapper */}
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        minHeight: { xs: 'calc(90vh - 134px)', md: 'calc(85vh - 112px)' },
                        // backgroundColor: 'lightblue', // 배경색 지정
                      }}
                    >
                    {/* 로그인 카드 */}
                    <Grid item>
                        <AuthCard>{children}</AuthCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
