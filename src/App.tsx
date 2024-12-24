import { AppProvider } from '@toolpad/core/AppProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ClientPortal from './components/ClientPortal';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { DashboardLayout } from '@toolpad/core';
import theme from './theme';
import logo from './assets/logo.png';
import { Box } from '@mui/material';
import LoginPage from './components/LoginPage';
import '../firebaseConfig';

const NAVIGATION = [
  { segment: 'admin-dashboard', title: 'Admin Dashboard', icon: <DashboardIcon /> },
  { segment: 'client-portal', title: 'Client Portal', icon: <PersonIcon /> },
];

function App() {
  return (
    <Router>
      <AppProvider navigation={NAVIGATION} theme={theme} branding={{
        title: 'Spa Dashboard', logo: (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src={logo} alt="Spa Dashboard" />
          </Box>
        ),
      }}>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/client-portal" element={<ClientPortal />} />
          </Routes>
        </DashboardLayout>
      </AppProvider>
    </Router>
  );
}

export default App;
