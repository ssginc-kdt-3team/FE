// assets
import { OrderedListOutlined } from '@ant-design/icons';

// icons
const icons = {
    OrderedListOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const Grade = {
    id: 'grade',
    title: '등급관리',
    type: 'group',
    children: [
        {
            id: 'gradelist',
            title: '등급리스트',
            type: 'item',
            url: '/grade/list',
            icon: icons.OrderedListOutlined
        }
    ]
};

export default Grade;