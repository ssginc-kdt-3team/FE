// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import axios from 'axios';
import './App.css';


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export const axiosWithBaseUrl = axios.create({
    baseURL: 'http://localhost:8080',
  });

const App = () => (
    <ThemeCustomization>
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
