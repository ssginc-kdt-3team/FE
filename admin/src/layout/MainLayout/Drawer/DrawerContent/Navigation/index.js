// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItems from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = ({ isLoggedIn }) => {
    const navGroups = menuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            case 'pages':
                // 로그인 하기 전 login 보임
                if (!isLoggedIn) {
                    return item.component;
                }
                break;
            case 'profile':
                // 로그인 후 profile 보임
                if (isLoggedIn) {
                     return item.component;
                } else {
                     return null; // 로그인되지 않은 경우 프로필이 표시되지 않음
                }
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
