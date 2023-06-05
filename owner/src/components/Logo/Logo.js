// material-ui
import { useTheme } from '@mui/material/styles';

// project
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

// ==============================|| LOGO SVG ||============================== //


const Logo = () => {
    const theme = useTheme();
    return (
        // <Link to="/"> 
       <img src={logo} alt="Stafield" style={{ height: 'auto', width: '140px', marginLeft: '0px'}} />
        // </Link>
    );
};


export default Logo;
