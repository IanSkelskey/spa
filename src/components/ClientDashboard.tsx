import { Dashboard, Person } from '@mui/icons-material';
import { DashboardLayout } from '@toolpad/core';
import { Dispatch, SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';

const NAVIGATION = [
	{ segment: 'profile', title: 'Dashboard', icon: <Dashboard /> },
  ];

  function ClientDashboard({ setNavigation }: { setNavigation: Dispatch<SetStateAction<{ segment: string; title: string; icon: JSX.Element; }[]>> }) {
	setNavigation(NAVIGATION);
	return (
		<DashboardLayout>
			<Routes>
				<Route path="/profile" element={<div>Clients</div>} />
			</Routes>
		</DashboardLayout>
	);
}

export default ClientDashboard;
