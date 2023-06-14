//로그인, 회원가입 카드
import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }) => (
    <MainCard
        sx={{
            maxWidth: { xs: 800, lg: 1000 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
        border={false}
        boxShadow
        shadow={(theme) => theme.customShadows.z1}
    >
        <Box sx={{ p: { xs: 3, sm: 4, md: 8, xl: 6 }}}>{children}</Box>
    </MainCard>
);

AuthCard.propTypes = {
    children: PropTypes.node
};

export default AuthCard;
