// assets
import { BulbOutlined, PlusSquareOutlined } from '@ant-design/icons';

// icons
const icons = {
    BulbOutlined,
    PlusSquareOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Notitext = {
    id: 'shop',
    title: '알림문구관리',
    type: 'group',
    children: [
        {
            id: 'notitextlist',
            title: '알림문구리스트',
            type: 'item',
            url: '/notitext/list',
            icon: icons.BulbOutlined,
        },
        {
            id: 'notitextreg',
            title: '알림문구등록',
            type: 'item',
            url: '/notitext/reg',
            icon: icons.PlusSquareOutlined,
        }
    ]
};

export default Notitext;