import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ShopReg from '../pages/shop/reg';
import MgtInfo from '../pages/mgt/info';
import MgtReview from '../pages/mgt/review';
import MgtUpdate from '../pages/mgt/update';
import RsvdRtList from '../pages/rsvd/rtlist';
import RsvdList from '../pages/rsvd/list';
import RsvdDeposit from '../pages/rsvd/deposit';





// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
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
            path: '/shop/reg',
            element: <ShopReg />
        },
        {
            path: '/rsvd',
            children: [
                {
                    path: '/rsvd/rtlist',
                    element: <RsvdRtList />
                },
                {
                    path: '/rsvd/list',
                    element: <RsvdList />
                },
                {
                    path: '/rsvd/deposit',
                    element: <RsvdDeposit />
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
                    path: '/mgt/review',
                    element: <MgtReview />
                },
                {
                    path: '/mgt/update',
                    element: <MgtUpdate />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
