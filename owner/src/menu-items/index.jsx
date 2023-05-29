// project import
import pages from './Authentication';
import profile from './Profile';
import resv from './Resv';
import mgt from './Mgt';

// import utilities from './utilities';
// import shop from './shop';

// ==============================|| MENU ITEMS ||============================== //

// 로그인 상태에 따라 페이지 업데이트
const menuItems = {

    items: [pages, profile, resv, mgt]

};
export default menuItems;


// items: [pages, resv, mgt, shop, utilities]