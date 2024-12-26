import { Dashboard, Person } from "@mui/icons-material";
import { PageContainer } from "@toolpad/core";
import { useEffect, useState } from "react";

export function useNavigation(role: string) {
	const [navigation, setNavigation] = useState<{ segment: string; title: string; icon: JSX.Element }[]>([]);
	const [routes, setRoutes] = useState<{ [key: string]: { path: string; component: JSX.Element } }>({});

	useEffect(() => {
		if (role === 'owner' || role === 'staff') {
			setRoutes({
				clients: { path: '/clients', component: <PageContainer maxWidth={false} title='Clients'>Clients</PageContainer> },
				dashboard: { path: '/dashboard', component: <PageContainer maxWidth={false} title='Dashboard'>Dashboard</PageContainer> }
			});
			setNavigation([
				{
					segment: 'dashboard',
					title: 'Dashboard',
					icon: <Dashboard />
				},
				{
					segment: 'clients',
					title: 'Clients',
					icon: <Person />
				}
			]);
		} else if (role === 'client') {
			setRoutes({
				profile: { path: '/profile', component: <PageContainer maxWidth={false} title='profile'>Profile</PageContainer> }
			});
			setNavigation([{
				segment: 'profile',
				title: 'Profile',
				icon: <Person />
			}]);
		}
	}, [role]);

	return { navigation, routes };
}
