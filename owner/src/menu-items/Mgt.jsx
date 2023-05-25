// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const mgt = {
    id: 'mgt',
    title: '매장 관리',
    type: 'group',
    children: [
        {
            id: 'mgtrtlist',
            title: '매장 정보',
            type: 'item',
            url: '/mgt/info',
            icon: icons.ChromeOutlined
        },
        {
            id: 'mgtlist',
            title: '매장 후기 조회',
            type: 'item',
            url: '/mgt/review',
            icon: icons.ChromeOutlined
        },
        // {
        //     id: 'menulist',
        //     title: '메뉴 조회',
        //     type: 'item',
        //     url: '/mgt/menu/list',
        //     icon: icons.ChromeOutlined
        // },
        {
            id: 'menureg',
            title: '메뉴 등록',
            type: 'item',
            url: '/mgt/menu/register',
            icon: icons.ChromeOutlined
        }
    ]
};

export default mgt;
