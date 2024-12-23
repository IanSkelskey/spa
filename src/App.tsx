import { AppProvider } from '@toolpad/core/AppProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ClientPortal from './components/ClientPortal';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DashboardLayout } from '@toolpad/core';

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
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppProvider navigation={NAVIGATION}>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/client-portal" element={<ClientPortal />} />
            </Routes>
          </DashboardLayout>
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
