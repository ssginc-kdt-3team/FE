// assets
import { TagOutlined } from '@ant-design/icons';

// icons
const icons = {
    TagOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Cupon = {
    id: 'cupon',
    title: '쿠폰관리',
    type: 'group',
    children: [
        {
            id: 'cuponlist',
            title: '쿠폰리스트',
            type: 'item',
            url: '/cupon/list',
            icon: icons.TagOutlined
        }
    ]
};

export default Cupon;