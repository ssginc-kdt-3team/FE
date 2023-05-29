// assets
import { LoginOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';


// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  LogoutOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const pages = {
    id: 'authentication',
    title: '인증',
    type: 'group',
    children: [
         {
          id: 'login',
          title: '로그인',
          type: 'item',
          url: '/login',
          icon: icons.LoginOutlined,
        },
        {
          id: 'register',
          title: '회원가입',
          type: 'item',
          url: '/register',
          icon: icons.ProfileOutlined,
        },
        {
          id: 'logout',
          title: '로그아웃',
          type: 'item',
          // onClick: handleLogout,
          url: '/logout',
          icon: icons.LogoutOutlined,
          target: true,
        },
    ]
};

export default pages;