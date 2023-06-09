// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const profile = {
    id: 'owner-profile',
    title: '정보관리',
    type: 'group',
    children: [
        {
            id: 'profile',
            title:'내정보관리',
            type: 'item',
            url: '/profile',
            icon: icons.UserOutlined
        }
        
    ]
};

export default profile;
