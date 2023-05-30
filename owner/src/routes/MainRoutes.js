import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import MyProfile from '../pages/profile/myprofile';
import ProfileUpdate from '../pages/profile/update';
import ShopAdd from '../pages/shop/Add';
import MgtInfo from '../pages/mgt/information/Index';
import MgtReview from '../pages/mgt/review/Review';
import MenuReg from '../pages/mgt/menu/Add';
import MgtInfoUpdate from '../pages/mgt/information/Update';
// import MenuList from '../pages/mgt/menu/mefnulist';
import MenuDetail from '../pages/mgt/menu/Detail';
import MenuUpdate from '../pages/mgt/menu/Update';
import ResvAcList from '../pages/resv/activeList/index';
import ResvList from '../pages/resv/list/index';
import ResTdList from '../pages/resv/todayList/index';
import ResvDeposit from '../pages/deposit/Table';
import ResvDetail from '../pages/resv/detail/index';



// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page

// render - utilities
// const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
// const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
// const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

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
                    element: <ResvDeposit />
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
