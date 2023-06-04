// assets
import { ChromeOutlined, QuestionOutlined, ShopOutlined , ProfileOutlined} from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    ShopOutlined,
    ProfileOutlined 
}
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
            icon: icons.ShopOutlined
        },
        {
            id: 'mgtlist',
            title: '매장 후기 조회',
            type: 'item',
            url: '/mgt/review',
            icon: icons.ProfileOutlined
        },
        //매장 정보로 이동
        // {
        //     id: 'menureg',
        //     title: '메뉴 등록',
        //     type: 'item',
        //     url: '/mgt/menu/register',
        //     icon: icons.ChromeOutlined
        // }
    ]
};

export default mgt;
