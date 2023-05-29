// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const profile = {
    id: 'owner-profile',
    title: '프로필',
    type: 'group',
    children: [
        {
            id: 'profile',
            title:'마이프로필',
            type: 'item',
            url: '/profile',
            icon: icons.UserOutlined
        }
        
    ]
};

export default profile;
