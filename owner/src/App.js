// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import axios from 'axios';
import './App.css';


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export const axiosWithBaseUrl = axios.create({
    baseURL: 'http://10.10.10.65:8080',
  });

// export const axiosWithBaseUrl = axios.create({
//     baseURL: 'http://localhost:8080',
//   });

const App = () => (
    <ThemeCustomization> 
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
