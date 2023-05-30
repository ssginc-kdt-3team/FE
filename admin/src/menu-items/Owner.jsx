// assets
import { SolutionOutlined, UserAddOutlined } from '@ant-design/icons';

// icons
const icons = {
    SolutionOutlined,
    UserAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'owner',
    title: '점주관리',
    type: 'group',
    children: [
        {
            id: 'ownerlist',
            title: '점주 정보 리스트',
            type: 'item',
            url: '/owner/list',
            icon: icons.SolutionOutlined,
        },
        // {
        //     id: 'ownerreg',
        //     title: '점주 등록',
        //     type: 'item',
        //     url: '/owner/reg',
        //     icon: icons.UserAddOutlined,
        // }
    ]
};

export default dashboard;
