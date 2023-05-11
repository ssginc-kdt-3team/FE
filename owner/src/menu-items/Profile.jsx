// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const profile = {
    id: 'owner-profile',
    title: 'owner-profile',
    type: 'group',
    children: [
        {
            id: 'profile',
            title: 'profile',
            type: 'item',
            url: '/owner/profile',
            icon: icons.UserOutlined
        }
    ]
};

export default profile;
