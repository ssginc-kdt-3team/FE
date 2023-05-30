// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'authentication',
    title: '인증',
    type: 'group',
    children: [
        {
            id: 'login1',
            title: '로그인',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true
        }
    ]
};

export default pages;  