import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const LoginForm = Loadable(lazy(() => import('pages/authentication/Login')));
const JoinForm = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <LoginForm />
        },
        {
            path: 'register',
            element: <JoinForm />
        }
    ]
};

export default LoginRoutes;
