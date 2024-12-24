import { Dashboard } from '@mui/icons-material';
import { DashboardLayout } from '@toolpad/core';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

const NAVIGATION = [
  { segment: 'profile', title: 'Dashboard', icon: <Dashboard /> },
];

function ClientDashboard({ setNavigation }: { setNavigation: Dispatch<SetStateAction<{ segment: string; title: string; icon: JSX.Element; }[]>> }) {
  useEffect(() => {
    setNavigation(NAVIGATION);
  }, [setNavigation]);

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/profile" element={<div>Profile</div>} />
      </Routes>
    </DashboardLayout>
  );
}

export default ClientDashboard;
