// material-ui
import { useTheme } from '@mui/material/styles';

// project
import logo from 'assets/images/logo.png';

//=================================|| LOGO  ||==================================//

const Logo = () => {
    const theme = useTheme();
    return (
       <img src={logo} alt="Stafield" style={{ height: 'auto', width: '140px', marginLeft: '0px'}} />
    );
};

export default Logo;
