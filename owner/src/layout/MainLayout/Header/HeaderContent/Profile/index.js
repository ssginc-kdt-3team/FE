import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    IconButton,
    ListItemText,
} from '@mui/material';

// project import
// import MainCard from 'components/MainCard';
// import Transitions from 'components/@extended/Transitions';
// import ProfileTab from './ProfileTab';

// assets : icons
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
    const theme = useTheme();

    const handleLogout = async () => {
        // logout
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const iconBackColorOpen = 'grey.300';

    return (
        <>
        <IconButton size="large" color="secondary" onClick={handleLogout}>
        <LogoutOutlined />
        <ListItemText primary="Logout" />
         </IconButton>
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        </Box>
        </>
    );
};

export default Profile;
