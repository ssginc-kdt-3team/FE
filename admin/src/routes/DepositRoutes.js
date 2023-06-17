import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout/index';

// render - deposit
const Deposit = Loadable(lazy(() => import('pages/deposit/index')));
const DepositFilter = Loadable(lazy(() => import('pages/deposit/Filter')));
const DepositList = Loadable(lazy(() => import('pages/deposit/List')));

// ==============================|| Deposit ROUTING ||============================== //

const LoginRoutes = {
    path: '/deposit',
    element: <MainLayout />,
    children: [
        {
            path: '/deposit',
            element: <Deposit/>
        },
        {
            path: '/deposit/filter',
            element: <DepositFilter/>
        },
        {
            path: '/deposit/list',
            element: <DepositList/>
        }
    ]
};

export default LoginRoutes;
