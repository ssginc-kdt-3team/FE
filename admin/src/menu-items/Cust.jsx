// assets
import { TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
    TeamOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const cust = {
    id: 'cust',
    title: '고객관리',
    type: 'group',
    children: [
        {
            id: 'custlist',
            title: '고객정보리스트',
            type: 'item',
            url: '/cust/list',
            icon: icons.TeamOutlined
        }
    ]
};

export default cust;