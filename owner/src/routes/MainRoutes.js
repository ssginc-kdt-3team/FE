import { lazy } from 'react';
import checkedLoggedIn from '../store/lib/checkedLoggedIn'; 

// project import 정적으로 모듈 불러오기(동기적)
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - 동적으로 모듈 불러오기(비동기적)
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const MyProfile = Loadable(lazy(() => import('../pages/profile/Myprofile')));
const ProfileUpdate = Loadable(lazy(() => import('../pages/profile/Update')));
const ShopAdd = Loadable(lazy(() => import('../pages/shop/Add')));
const MgtInfo = Loadable(lazy(() => import('../pages/mgt/information/Index')));
const MgtReview = Loadable(lazy(() => import('../pages/mgt/review/Review')));
const MenuReg = Loadable(lazy(() => import('../pages/mgt/menu/Add')));
const MgtInfoUpdate = Loadable(lazy(() => import('../pages/mgt/information/Update')));
const MenuDetail = Loadable(lazy(() => import('../pages/mgt/menu/Detail')));
const MenuUpdate = Loadable(lazy(() => import('../pages/mgt/menu/Update')));
const ResvAcList = Loadable(lazy(() => import('../pages/resv/activeList/index')));
const ResvList = Loadable(lazy(() => import('../pages/resv/list/index')));
const ResTdList = Loadable(lazy(() => import('../pages/resv/todayList/index')));
const DepositTable = Loadable(lazy(() => import('../pages/deposit/Table')));
const ResvDetail = Loadable(lazy(() => import('../pages/resv/detail/index')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    canActivate: [checkedLoggedIn],
    children: [
        {
            path: '/main',
            element: <DashboardDefault />,

        },
        {
            path: '/profile',
            children: [
                
                {
           		 path: '/profile',
          		 element: <MyProfile />
        	       },
                {
                    path: '/profile/update/:id',
                    element: <ProfileUpdate />
                }, 
            ]
        },
        {
            path: '/shop/register',
            element: <ShopAdd />
        },
        {
            path: '/resv',
            children: [
                {
                    path: '/resv/tdlist',
                    element: <ResTdList />
                },
                {
                    path: '/resv/aclist',
                    element: <ResvAcList />
                },
                {
                    path: '/resv/list',
                    element: <ResvList />
                },
                {
                    path: '/resv/deposit',
                    element: <DepositTable />
                },
                {
                    path: '/resv/detail/:id',
                    element: <ResvDetail />
                }        
            ]
        },
        {
            path: '/mgt',
            children: [
                {
                    path: '/mgt/info',
                    element: <MgtInfo />
                },
                {
                    path: '/mgt/info/update/:id',
                    element: <MgtInfoUpdate />
                },
                {
                    path: '/mgt/review',
                    element: <MgtReview />
                },
                {
                    path: '/mgt/menu/register',
                    element: <MenuReg />
                },
                {
                    path: '/mgt/menu/detail/:id',
                    element: <MenuDetail />
                },
                {
                    path: '/mgt/menu/update/:id',
                    element: <MenuUpdate />
                }
            ]
        }
    ]
};

export default MainRoutes;
