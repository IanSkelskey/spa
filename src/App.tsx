import { AppProvider } from '@toolpad/core/AppProvider';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import ClientPortal from './components/ClientPortal';
import Login from './components/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import { DashboardLayout } from '@toolpad/core';
import { User } from 'firebase/auth';

const theme = createTheme({
  palette: {
    primary: { main: '#A266B0' },
    secondary: { main: '#A266B0' },
  },
});

const NAVIGATION = [
  { segment: 'admin-dashboard', title: 'Admin Dashboard', icon: <DashboardIcon /> },
  { segment: 'client-portal', title: 'Client Portal', icon: <PersonIcon /> },
];

function App() {

  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppProvider navigation={NAVIGATION}>
          <DashboardLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin-dashboard"
                element={user ? <AdminDashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/client-portal"
                element={user ? <ClientPortal /> : <Navigate to="/login" />}
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </DashboardLayout>
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
