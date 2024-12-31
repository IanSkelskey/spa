import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from './App';
import DashboardLayout from './layouts/dashboard';
import { useAuth } from './utils/useAuth';
import LoadingFallback from './components/LoadingFallback';
import { PageContainer } from '@toolpad/core';
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { getUserRole } from './utils/firestore';

const DashboardPage = React.lazy(() => import('./pages/dashboard'));
const ClientsPage = React.lazy(() => import('./pages/clients'));
const StaffPage = React.lazy(() => import('./pages/staff'));
const ProfilePage = React.lazy(() => import('./pages/profile'));
const LoginPage = React.lazy(() => import('./pages/login'));
const HomePage = React.lazy(() => import('./pages/home'));
const NotFoundPage = React.lazy(() => import('./pages/404'));
const ClientDetailsPage = React.lazy(() => import('./pages/clientDetails'));

export const LogoutContext = React.createContext<() => void>(() => {});

const AppWithAuth = () => {
    const { user, login, logout } = useAuth();

    // If no user is provided, always render the login page
    if (!user) {
        return <LoginPage login={login} />;
    }

    return (
        <LogoutContext.Provider value={logout}>
            <React.Suspense fallback={<LoadingFallback />}>
                <Outlet />
            </React.Suspense>
        </LogoutContext.Provider>
    );
};

const ProtectedRoute = ({
    children,
    allowedRoles,
}: {
    children: React.ReactNode;
    allowedRoles: string[];
}) => {
    const { user } = useAuth();
    const [role, setRole] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserRole = async () => {
            if (user && user.email) {
                setLoading(true);
                try {
                    const role = await getUserRole(user.email);
                    setRole(role);
                } catch (error) {
                    console.error('Error fetching user role:', error);
                    setRole(null); // Handle error
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [user]);

    if (loading) {
        return <LoadingFallback />;
    }

    if (!allowedRoles.includes(role!)) {
        return (
            <PageContainer title="Unauthorized">
                You are not authorized to view this page.
            </PageContainer>
        );
    } else {
        return <>{children}</>;
    }
};

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: AppWithAuth,
                children: [
                    {
                        path: '/',
                        Component: () => <DashboardLayout />,
                        children: [
                            {
                                path: '',
                                Component: HomePage,
                            },
                            {
                                path: 'dashboard',
                                Component: DashboardPage,
                            },
                            {
                                path: 'clients',
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={['staff', 'owner']}
                                    >
                                        <ClientsPage />
                                    </ProtectedRoute>
                                ),
                            },
                            {
                                path: 'clients/:email',
                                element: (
                                    <ProtectedRoute
                                        allowedRoles={['staff', 'owner']}
                                    >
                                        <ClientDetailsPage />
                                    </ProtectedRoute>
                                ),
                            },
                            {
                                path: 'profile',
                                Component: ProfilePage,
                            },
                            {
                                path: 'staff',
                                element: (
                                    <ProtectedRoute allowedRoles={['owner']}>
                                        <StaffPage />
                                    </ProtectedRoute>
                                ),
                            },
                            {
                                path: '*', // Catch-all for undefined routes
                                Component: NotFoundPage,
                            },
                        ],
                    },
                ],
            },
            {
                path: '/login',
                Component: () => {
                    const { login } = useAuth();
                    return <LoginPage login={login} />;
                }, // Ensure the login page is accessible directly via /login
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NotificationsProvider>
            <RouterProvider router={router} />
        </NotificationsProvider>
    </React.StrictMode>
);
