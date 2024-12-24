import { AppProvider } from '@toolpad/core/AppProvider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ClientDashboard from './components/ClientDashboard';
import theme from './utils/theme';
import logo from './assets/logo.png';
import { Box } from '@mui/material';
import LoginPage from './components/LoginPage';
import './utils/firebaseConfig';
import { useState } from 'react';
import app from './utils/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

function App() {
  const [navigation, setNavigation] = useState<{ segment: string; title: string; icon: JSX.Element }[]>([]);

  return (
    <Router>
      <AppProvider navigation={navigation} theme={theme} branding={{
        title: 'Spa Dashboard', logo: (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src={logo} alt="Spa Dashboard" />
          </Box>
        ),
      }}>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard setNavigation={setNavigation} />} />
          <Route path="/client-dashboard" element={<ClientDashboard setNavigation={setNavigation} />} />
          <Route path="/" element={<LoginPage auth={auth} signInWithEmailAndPassword={signInWithEmailAndPassword} />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
