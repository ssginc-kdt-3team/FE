// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import axios from 'axios';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

// 도메인 서버
// export const axiosWithBaseUrl = axios.create({
//     baseURL: 'https://www.teamyes.xyz',
//   });
//로컬 서버
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
