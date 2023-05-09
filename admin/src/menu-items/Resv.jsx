// assets
import { HistoryOutlined, CopyrightOutlined } from '@ant-design/icons';

// icons
const icons = {
    HistoryOutlined,
    CopyrightOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Resv = {
    id: 'resv',
    title: '예약관리',
    type: 'group',
    children: [
        {
            id: 'resvlist',
            title: '예약 내역 조회',
            type: 'item',
            url: '/resv/list',
            icon: icons.HistoryOutlined
            // breadcrumbs: false
        },
        {
            id: 'depositlist',
            title: '예약금 내역 조회',
            type: 'item',
            url: '/resv/deposit',
            icon: icons.CopyrightOutlined
            // breadcrumbs: false
        }
    ]
};

export default Resv;