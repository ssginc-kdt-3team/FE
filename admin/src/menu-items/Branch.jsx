// assets
import { ShopOutlined } from '@ant-design/icons';

// icons
const icons = {
    ShopOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const branch = {
    id: 'branch',
    title: '지점관리',
    type: 'group',
    children: [
        {
            id: 'branchlist',
            title: '지점리스트',
            type: 'item',
            url: '/branch/list',
            icon: icons.ShopOutlined
        },
        {
            id: 'branchreg',
            title: '지점등록',
            type: 'item',
            url: '/branch/add',
            icon: icons.ShopOutlined
        }
    ]
};

export default branch;