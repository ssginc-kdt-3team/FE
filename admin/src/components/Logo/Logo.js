// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Mantis" width="100" />
         *
         */
        // <Link to="/">
        <img src={logo} alt="Stafield" style={{ height: 'auto', width: '140px', marginLeft: '0'}} /> 
        // </Link>
    );
};

export default Logo;
