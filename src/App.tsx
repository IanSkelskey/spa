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
import { DashboardLayout } from "@toolpad/core";
import { Dashboard } from "@mui/icons-material";

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

  const navigate = useNavigate();

  const onLogin = (user: any) => {
    console.log("User signed in:", user);
    navigate("/dashboard");
    // Example: set navigation based on role
    setNavigation([
      { segment: "dashboard", title: "Dashboard", icon: <Dashboard /> },
    ]);
  };

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
              <DashboardLayout>
                <div>Dashboard</div>
              </DashboardLayout>
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
