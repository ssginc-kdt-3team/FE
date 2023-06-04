// assets
import {  UnorderedListOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons';

// icons
const icons = {
    UnorderedListOutlined,
    BarChartOutlined,
    LineChartOutlined 
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
            icon: icons.UnorderedListOutlined
        },
        {
            id: 'resvlist',
            title: '예약 내역 조회',
            type: 'item',
            url: '/resv/list',
            icon: icons.BarChartOutlined
        },
        {
            id: 'resvdeposit',
            title: '예약금 내역 조회',
            type: 'item',
            url: '/resv/deposit',
            icon: icons.LineChartOutlined
        }
    ]
};

export default resv;
