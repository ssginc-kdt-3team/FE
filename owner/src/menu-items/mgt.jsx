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
            title: '예약 내역 조회',
            type: 'item',
            url: '/mgt/review',
            icon: icons.ChromeOutlined
        },
        {
            id: 'mgtdeposit',
            title: '매장 정보 수정',
            type: 'item',
            url: '/mgt/update',
            icon: icons.ChromeOutlined
        }
    ]
};

export default mgt;