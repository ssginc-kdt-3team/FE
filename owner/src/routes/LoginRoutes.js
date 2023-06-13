import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const LoginForm = Loadable(lazy(() => import('pages/authentication/Login')));
const JoinForm = Loadable(lazy(() => import('pages/authentication/Register')));
const Findid = Loadable(lazy(() => import('pages/authentication/auth-forms/Findid')));
const Findpwd = Loadable(lazy(() => import('pages/authentication/auth-forms/Findpwd')));
const NoAccess = Loadable(lazy(() => import('pages/authentication/auth-forms/NoAccess')));
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    
    children: [
        {
            path: '/',
            element: <LoginForm />
        },
        {
            path: '/register',
            element: <JoinForm />
        },
        {
            path: '/findid',
            element: <Findid />
        },
        {
            path: '/findpwd',
            element: <Findpwd />
        } ,   
        {
          path: '/noaccess',
          element: <NoAccess />
        }    
    ]
};

export default LoginRoutes;
