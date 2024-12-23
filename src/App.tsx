import { AppProvider } from '@toolpad/core/AppProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ClientPortal from './components/ClientPortal';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#00796b' },
    secondary: { main: '#c2185b' },
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
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/client-portal" element={<ClientPortal />} />
          </Routes>
        </AppProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
