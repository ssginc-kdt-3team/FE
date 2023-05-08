// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const profile = {
    id: 'admin-profile',
    title: 'admin-profile',
    type: 'group',
    children: [
        {
            id: 'profile',
            title: 'profile',
            type: 'item',
            url: '/admin/profile',
            icon: icons.UserOutlined
        }
    ]
};

export default profile;
