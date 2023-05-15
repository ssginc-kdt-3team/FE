import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Profile from '../pages/admin/profile';
import ResvList from '../pages/resv/list';
import ResvDetail from '../pages/resv/detail';
// import Deposit from '../pages/deposit/index';
// import DepositList from '../pages/deposit/list';
// import DepositLayout from '../pages/deposit/Layout'; // 추가된 부분
import Deposit from '../pages/deposit/index';
import DepositList from '../pages/deposit/list';
import DepositFilter from '../pages/deposit/filter'; 
import DepositShopList from '../pages/deposit/shop';
import CustList from '../pages/cust/list';
import CustDetail from '../pages/cust/detail';
import OwnerList from '../pages/owner/list';
import OwnerDetail from '../pages/owner/detail';
import OwnerJoin from '../pages/owner/join';
import ShopList from '../pages/shop/list';
import ShopDetail from '../pages/shop/detail';
import ShopReview from '../pages/shop/review';
import ShopMenu from '../pages/shop/menu';
import ShopReg from '../pages/shop/reg';
import BranchList from '../pages/branch/list';
import BranchDetail from 'pages/branch/detail';
import NotitextList from '../pages/notitext/list';
import NotitextReg from '../pages/notitext/reg';
import GradeList from '../pages/grade/list';
import CuponList from '../pages/cupon/list';



// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
// const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/admin/profile',
            element: <Profile />
        },
        {
            path: '/cust',
            children: [
                {
                    path: '/cust/list',
                    element: <CustList />
                },
                {
                    path: '/cust/detail/:id',
                    element: <CustDetail />
                }
            ]
        },
        {
                path: '/deposit',
                children: [
                    {
                        path: '/deposit',
                        element: <Deposit />
                    },
                    {
                        path: '/deposit/list/:id',
                        element: <DepositList />
                    },
                    {
                        path: '/deposit/list/shop/:id',
                        element: <DepositShopList />
                    },
                    {
                        path: '/deposit/filter',
                        element: <DepositFilter />
                    }
                ]
        },
        {
            path: '/owner',
            children: [
                {
                    path: '/owner/list',
                    element: <OwnerList />
                },
                {
                    path: '/owner/reg',
                    element: <OwnerJoin />
                },
                {
                    path: '/owner/detail/:id',
                    element: <OwnerDetail />
                },
            ]
        },
        {
            path: '/resv',
            children: [
                {
                    path: '/resv/list',
                    element: <ResvList />
                },
                {
                    path: '/resv/detail/:id',
                    element: <ResvDetail />
                }
            ]
        },
        {
            path: '/shop',
            children: [
        {
            path: '/shop/list',
            element: <ShopList />
        },
        {
            path: '/shop/detail/:id',
            element: <ShopDetail />
        },
        {
            path: '/shop/review',
            element: <ShopReview />
        },
        {
            path: '/shop/menu',
            element: <ShopMenu/>
        },
        {
            path: '/shop/reg',
            element: <ShopReg/>
        },
            ]
        },
        {
            path: '/branch',
            children: [
            {
            path: '/branch/list',
            element: <BranchList />
            },
            {
                path: '/branch/detail/:id',
                element: <BranchDetail />
                }
            ]
        },
        {
            path: '/notitext',
            children: [
                 {
                     path: '/notitext/list',
                     element: <NotitextList />
                 },
                {
                     path: '/notitext/reg',
                    element: <NotitextReg />
                 },
            ]
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: '/grade/list',
            element: <GradeList />
        },
        {
            path: '/cupon/list',
            element: <CuponList />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
