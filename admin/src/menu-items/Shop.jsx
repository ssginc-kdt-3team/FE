// assets
import { MessageOutlined, HomeOutlined, ProfileOutlined, FileAddOutlined } from '@ant-design/icons';

// icons
const icons = {
    MessageOutlined,
    HomeOutlined,
    ProfileOutlined,
    FileAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const shop = {
    id: 'shop',
    title: '매장관리',
    type: 'group',
    children: [
        {
            id: 'shoplist',
            title: '매장 리스트',
            type: 'item',
            url: '/shop/list',
            icon: icons.HomeOutlined
            // breadcrumbs: false
        },
        {
            id: 'shopreview',
            title: '후기 관리',
            type: 'item',
            url: '/shop/review',
            icon: icons.MessageOutlined
            // breadcrumbs: false
        },
        {
            id: 'shopmenu',
            title: '메뉴 관리',
            type: 'item',
            url: '/shop/menu',
            icon: icons.ProfileOutlined
            // breadcrumbs: false
        },
        {
            id: 'shopreg',
            title: '매장 등록',
            type: 'item',
            url: '/shop/reg',
            icon: icons.FileAddOutlined
            // breadcrumbs: false
        }
    ]
};

export default shop;