// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const shop = {
    id: 'shop',
    title: '매장등록',
    type: 'group',
    children: [
        {
            id: 'shopreg',
            title: '매장 등록하기',
            type: 'item',
            url: '/shop/reg',
            icon: icons.ChromeOutlined
        }
    ]
};

export default shop;
