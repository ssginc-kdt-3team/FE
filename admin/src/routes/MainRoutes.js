import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ResvList from '../pages/resv/List';
import ResvDetail from '../pages/resv/Detail';
// import Deposit from '../pages/deposit/index';
// import DepositList from '../pages/deposit/list';
// import DepositLayout from '../pages/deposit/Layout'; // 추가된 부분
import Deposit from '../pages/deposit/index';
import DepositList from '../pages/deposit/List';
import DepositFilter from '../pages/deposit/Filter'; 
import DepositShopList from '../pages/deposit/Shop';
import CustList from '../pages/cust/List';
import CustDetail from '../pages/cust/Detail';
import OwnerList from '../pages/owner/List';
import OwnerDetail from '../pages/owner/Detail';
import ShopList from '../pages/shop/List';
import ShopDetail from '../pages/shop/Detail';
// import ShopReview from '../pages/shop/review';
// import ShopMenu from '../pages/shop/menu';
// import ShopReg from '../pages/shop/reg';
import BranchList from '../pages/branch/List';
import BranchDetail from 'pages/branch/Detail';
import BranchAdd from '../pages/branch/Add'
import BranchUpdate from '../pages/branch/Update'
import NotitextList from '../pages/notitext/List';
import NotitextReg from '../pages/notitext/Reg';
import GradeList from '../pages/grade/List';
import CuponList from '../pages/cupon/List';



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
            path: '/main',
            element: <DashboardDefault />
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
        // {
        //     path: '/shop/review',
        //     element: <ShopReview />
        // },
        // {
        //     path: '/shop/reg',
        //     element: <ShopReg/>
        // },
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
            },
            {
                path: '/branch/update/:id',
                element: <BranchUpdate />
            },
            {
                path: '/branch/add',
                element: <BranchAdd />
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
