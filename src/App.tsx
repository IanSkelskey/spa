import { AppProvider } from "@toolpad/core/AppProvider";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { lightTheme, darkTheme } from "./utils/theme";
import logo from "./assets/logo.png";
import { Box, useMediaQuery } from "@mui/material";
import "./utils/firebaseConfig";
import { useAuth } from "./utils/useAuth";
import { DashboardLayout } from "@toolpad/core";
import { useNavigation } from "./utils/useNavigation";
import { getUserRole } from "./utils/firestore";
import { useEffect, useState } from "react";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const { user, AuthWrapper } = useAuth();

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.email) {
      getUserRole(user.email).then(setRole);
    }
  }, [user]);

  const {navigation, routes} = useNavigation(role || '');

  useEffect(() => {
    console.log("User role is", role);
    console.log("Navigation is", navigation);
  }, [role, navigation]);

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
      <AuthWrapper>
        <DashboardLayout>
          <Routes>
            {Object.values(routes).map(({ path, component }: { path: string; component: JSX.Element }) => (
              <Route key={path} path={path} element={component} />
            ))}
          </Routes>
        </DashboardLayout>
      </AuthWrapper>
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
