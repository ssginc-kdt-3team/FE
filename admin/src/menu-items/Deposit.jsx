// assets
import { HistoryOutlined } from '@ant-design/icons';

// icons
const icons = {
    HistoryOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Deposit = {
    id: 'deposit',
    title: '예약금관리',
    type: 'group',
    children: [
        {
            id: 'deposit',
            title: '예약금내역',
            type: 'item',
            url: '/deposit',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'depositfilter',
            title: '예약금내역리스트-지울거',
            type: 'item',
            url: '/deposit/filter',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'depositlist',
            title: '예약금내역리스트-지울거',
            type: 'item',
            url: '/deposit/list',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        },
        {
            id: 'depositdetail',
            title: '지점별 예약금 리스트-확인용',
            type: 'item',
            url: '/deposit/branch/:id',
            icon: icons.HistoryOutlined,
            breadcrumbs: false
        }
    ]
};

export default Deposit;