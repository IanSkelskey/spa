import * as React from 'react';
import { AppProvider } from '@toolpad/core/react-router-dom';
import type { Navigation } from '@toolpad/core';
import { useMediaQuery } from '@mui/material';
import { lightTheme, darkTheme } from './utils/theme';
import { useAuth } from './utils/useAuth';
import logo from './assets/logo.svg';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Badge, Dashboard, Home, People, Person } from '@mui/icons-material';
import { getUserRole } from './utils/firestore';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const { user } = useAuth();
    const [role, setRole] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchUserRole = async () => {
            if (user && user.email) {
                try {
                    const role = await getUserRole(user.email);
                    setRole(role);
                } catch (error) {
                    console.error('Error fetching user role:', error);
                    setRole(null); // Handle error
                }
            }
        };

        fetchUserRole();
    }, [user]);

    const NAVIGATION: Navigation = React.useMemo(() => {
        if (role === 'owner' || role === 'staff') {
            return [
                {
                    segment: '',
                    title: 'Home',
                    icon: <Home />,
                },
                {
                    segment: 'profile',
                    title: 'Profile',
                    icon: <Person />,
                },
                {
                    kind: 'header',
                    title: 'Main Items',
                },
                {
                    segment: 'dashboard',
                    title: 'Dashboard',
                    icon: <Dashboard />,
                },
                {
                    segment: 'clients',
                    title: 'Clients',
                    icon: <People />,
                },
                {
                    segment: 'staff',
                    title: 'Staff',
                    icon: <Badge />,
                },
            ];
        } else if (role === 'client') {
            return [
                {
                    segment: '',
                    title: 'Home',
                    icon: <Home />,
                },
                {
                    kind: 'header',
                    title: 'Profile',
                },
                {
                    segment: 'profile',
                    title: 'Profile',
                    icon: <Person />,
                },
            ];
        }
        return [];
    }, [role]);

    return (
        <AppProvider
            navigation={NAVIGATION}
            theme={prefersDarkMode ? darkTheme : lightTheme}
            branding={{
                title: 'Spa Dashboard',
                logo: (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <img
                            src={logo}
                            alt="Spa Dashboard"
                            style={{
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                            }}
                        />
                    </Box>
                ),
            }}
        >
            <Outlet />
        </AppProvider>
    );
}

export default App;