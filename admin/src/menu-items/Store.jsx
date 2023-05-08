// assets
import { ShopOutlined } from '@ant-design/icons';

// icons
const icons = {
    ShopOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const store = {
    id: 'store',
    title: '지점관리',
    type: 'group',
    children: [
        {
            id: 'storelist',
            title: '지점리스트',
            type: 'item',
            url: '/store/list',
            icon: icons.ShopOutlined
            // breadcrumbs: false
        }
    ]
};

export default store;