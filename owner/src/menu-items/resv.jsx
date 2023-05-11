// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const resv = {
    id: 'resv',
    title: '예약관리',
    type: 'group',
    children: [
        {
            id: 'resvtdlist',
            title: '오늘 예약 조회',
            type: 'item',
            url: '/resv/tdlist',
            icon: icons.ChromeOutlined
        },
        {
            id: 'resvrtlist',
            title: '예약 중 조회(이름바꾸기)',
            type: 'item',
            url: '/resv/aclist',
            icon: icons.ChromeOutlined
        },
        {
            id: 'resvlist',
            title: '예약 내역 조회',
            type: 'item',
            url: '/resv/list',
            icon: icons.ChromeOutlined
        },
        {
            id: 'resvdeposit',
            title: '예약금 내역 조회',
            type: 'item',
            url: '/resv/deposit',
            icon: icons.ChromeOutlined
        }
    ]
};

export default resv;