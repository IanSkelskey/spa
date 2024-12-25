import { AppProvider } from "@toolpad/core/AppProvider";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { lightTheme, darkTheme } from "./utils/theme";
import logo from "./assets/logo.png";
import { Box, useMediaQuery } from "@mui/material";
import LoginPage from "./components/LoginPage";
import "./utils/firebaseConfig";
import { useState } from "react";
import app from "./utils/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getUserRole } from "./utils/firestore";
import AdminDashboard from "./components/AdminDashboard";
import ClientDashboard from "./components/ClientDashboard";
import { Dashboard } from "@mui/icons-material";
import { DashboardLayout } from "@toolpad/core";

const auth = getAuth(app);

function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/" />;
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [navigation, setNavigation] = useState<
    { segment: string; title: string; icon: JSX.Element }[]
  >([]);
  const [dashboard, setDashboard] = useState<JSX.Element | null>(null);
  const navigate = useNavigate();

  const onLogin = async (user: any) => {
    console.log("User signed in:", user);
    const role = await getUserRole(user.email);
    console.log("User role:", role);
    if (role) {
      openDashboard(role);
    } else {
      console.error("Role is null");
    }
  };

  const openDashboard = (role: string) => {
    if (role === "owner" || role === "staff" || role === "client") {
      setDashboard(role === "owner" || role === "staff" ? <AdminDashboard setNavigation={setNavigation} /> : <ClientDashboard setNavigation={setNavigation} />);
      navigate("/dashboard");
    } else {
      console.error("Unknown role:", role);
    }
  }


  return (
    <AppProvider
      navigation={navigation}
      theme={prefersDarkMode ? darkTheme : lightTheme}
      branding={{
        title: "Spa Dashboard",
        logo: (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img src={logo} alt="Spa Dashboard" />
          </Box>
        ),
      }}
    >
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {dashboard || <div>Loading...</div>}
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <LoginPage
              auth={auth}
              signInWithEmailAndPassword={signInWithEmailAndPassword}
              onLogin={onLogin}
            />
          }
        />
      </Routes>
    </AppProvider>
  );
}

function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default RootApp;
