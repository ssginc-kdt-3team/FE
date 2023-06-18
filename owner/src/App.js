import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import axios from 'axios';
import './App.css';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

// 도메인서버
export const axiosWithBaseUrl = axios.create({
    baseURL: 'https://www.teamyes.xyz',
  });
  
// 모바일 테스트용
// export const axiosWithBaseUrl = axios.create({
//     baseURL: 'http://10.10.10.65:8080',
//   });

// 로컬서버
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
