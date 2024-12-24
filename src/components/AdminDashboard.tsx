import { Person } from '@mui/icons-material';
import { DashboardLayout } from '@toolpad/core';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

const NAVIGATION = [
  { segment: 'clients', title: 'Clients', icon: <Person /> },
];

function AdminDashboard({ setNavigation }: { setNavigation: Dispatch<SetStateAction<{ segment: string; title: string; icon: JSX.Element; }[]>> }) {
  useEffect(() => {
    setNavigation(NAVIGATION);
  }, [setNavigation]);

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/clients" element={<div>Clients</div>} />
      </Routes>
    </DashboardLayout>
  );
}

export default AdminDashboard;
