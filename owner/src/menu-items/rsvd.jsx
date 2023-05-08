// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const rsvd = {
    id: 'rsvd',
    title: '예약관리',
    type: 'group',
    children: [
        {
            id: 'rsvdrtlist',
            title: '실시간 예약리스트',
            type: 'item',
            url: '/rsvd/rtlist',
            icon: icons.ChromeOutlined
        },
        {
            id: 'rsvdlist',
            title: '예약 내역 조회',
            type: 'item',
            url: '/rsvd/list',
            icon: icons.ChromeOutlined
        },
        {
            id: 'rsvddeposit',
            title: '예약금 내역 조회',
            type: 'item',
            url: '/rsvd/deposit',
            icon: icons.ChromeOutlined
        }
    ]
};

export default rsvd;