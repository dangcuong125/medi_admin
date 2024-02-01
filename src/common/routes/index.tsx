import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

import EventList from '../../event-merchant/pages/EventList';
import EventCreate from '../../event-merchant/pages/EventCreate';
import EventEdit from '../../event-merchant/pages/EventEdit';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
    const { pathname } = useLocation();

    const { isAuthenticated } = useAuth();

    const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

    return (
        <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    ),
                },
                {
                    path: 'forgot-password',
                    element: <ForgotPassword />,
                },
                {
                    path: 'reset-password',
                    element: <ResetPassword />,
                },
            ],
        },

        // Dashboard Routes
        {
            path: 'dashboard',
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                {
                    path: 'shop-invitation',
                    element: <h1>Hello shop invitation</h1>,
                },
                {
                    path: PATH_DASHBOARD.general.administrationList,
                    element: <Administration />,
                },
                {
                    path: PATH_DASHBOARD.general.administrationEdit,
                    element: <AdministrationEdit />,
                },
                {
                    path: PATH_DASHBOARD.general.administrationCreateGroup,
                    element: <AdministrationCreateGroup />,
                },
                {
                    path: '',
                    children: [
                        {
                            element: <UserList />,
                            // index: true,
                        },
                        {
                            path: PATH_DASHBOARD.user.root,
                            element: <UserList />,
                        },
                        { path: 'user/:id', element: <UserView></UserView> },
                    ],
                },
                {
                    path: 'merchants',
                    children: [
                        { path: 'list', element: <ListMerchants /> },
                        { path: 'create', element: <CreateMerchant /> },
                        { path: ':id', element: <EditMerchant /> },
                    ],
                },
                // ADMIN
                {
                    path: '',
                    children: [
                        { element: <AdminList /> },
                        { path: 'admin', element: <AdminList /> },
                        { path: 'admin/admin-list', element: <AdminList /> },
                        { path: 'admin/admin-edit/:id', element: <AdminEdit /> },
                        { path: 'admin/admin-create', element: <AdminCreate /> },
                    ],
                },
                // Event Routes
                {
                    path: '',
                    children: [
                        { element: <EventList /> },
                        { path: PATH_DASHBOARD.event.list, element: <EventList /> },
                        { path: PATH_DASHBOARD.event.detail, element: <EventEdit /> },
                    ],
                },
                // product
                {
                    path: '',
                    children: [
                        { element: <ProductList /> },
                        { path: PATH_DASHBOARD.product.list, element: <ProductList /> },
                        { path: PATH_DASHBOARD.product.detail, element: <ProductEdit /> }
                    ]
                },
                // Gift Routes
                {
                    path: PATH_DASHBOARD.gift.root,
                    children: [
                        {
                            element: <Navigate to={PATH_DASHBOARD.gift.root} replace />,
                            index: true
                        },
                        { path: PATH_DASHBOARD.gift.list, element: <GiftList /> },
                        { path: PATH_DASHBOARD.gift.detail, element: <GiftList /> }
                    ]
                },
            ],
        },


        // Main Routes
        {
            path: '*',
            element: <LogoOnlyLayout />,
            children: [
                { path: '500', element: <Page500 /> },
                { path: '404', element: <Page404 /> },
                { path: '403', element: <Page403 /> },
                { path: '*', element: <Navigate to="/404" replace /> },
            ],
        },
        {
            path: '/',
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
        },
    ]);
}
// auth
const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const Administration = Loadable(
    lazy(() => import('../../administration/administration-list/components/index'))
);
const ForgotPassword = Loadable(
    lazy(() => import('../../auth/forgot-password/ForgotPassword'))
);
const ResetPassword = Loadable(
    lazy(() => import('../../auth/reset-password/ResetPassword'))
);
// manage user
const UserView = Loadable(lazy(() => import('../../user/user-pages/UserView')));
const UserList = Loadable(lazy(() => import('../../user/user-pages/UserList')));
// Error page

// admin
const AdminList = Loadable(lazy(() => import('../../admin/admin-pages/AdminList')));
const AdminEdit = Loadable(lazy(() => import('../../admin/admin-pages/AdminEdit')));
const AdminCreate = Loadable(lazy(() => import('../../admin/admin-pages/AdminCreate')));

// product
const ProductList = Loadable(lazy(() => import('../../product/product-list')));
const ProductEdit = Loadable(lazy(() => import('../../product/product-edit')));

// merchants
const ListMerchants = Loadable(
    lazy(() => import('src/merchant/merchant-list/ListMerchant'))
);
const CreateMerchant = Loadable(
    lazy(() => import('src/merchant/merchant-new/AddNewMerchant'))
);
const EditMerchant = Loadable(
    lazy(() => import('src/merchant/merchant-edit/EditMerchant'))
);
const AdministrationEdit = Loadable(
    lazy(() => import('src/administration/administration-edit/components/index'))
);


// gifts
const GiftList = Loadable(lazy(() => import('src/gift/gift-list')))

const AdministrationCreateGroup = Loadable(
    lazy(
        () =>
            import(
                'src/administration/administration-create-group/components/index'
            )
    )
);

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
