import * as React from "react";
import { AppProvider } from "@toolpad/core/react-router-dom";
import type { Navigation } from "@toolpad/core";
import { useMediaQuery } from "@mui/material";
import { lightTheme, darkTheme } from "./utils/theme";
import { useAuth } from "./utils/useAuth";
import { getUserRole } from "./utils/firestore";
import logo from "./assets/logo.png";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Badge, Dashboard, Home, People, Person } from "@mui/icons-material";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { user } = useAuth();
  const [role, setRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user && user.email) {
      getUserRole(user.email).then(setRole);
    }
  }, [user]);

  const NAVIGATION: Navigation = React.useMemo(() => {
    if (role === "owner" || role === "staff") {
      return [
        {
          segment: "",
          title: "Home",
          icon: <Home />,
        },
        {
          segment: "profile",
          title: "Profile",
          icon: <Person />,
        },
        {
          kind: "header",
          title: "Main Items",
        },
        {
          segment: "dashboard",
          title: "Dashboard",
          icon: <Dashboard />,
        },
        {
          segment: "clients",
          title: "Clients",
          icon: <People />,
        },
        {
          segment: "staff",
          title: "Staff",
          icon: <Badge />,
        }
      ];
    } else if (role === "client") {
      return [
        {
          segment: "",
          title: "Home",
          icon: <Home />,
        },
        {
          kind: "header",
          title: "Profile",
        },
        {
          segment: "profile",
          title: "Profile",
          icon: <Person />,
        },
      ];
    }
    return [];
  }, [role]);

  return (
    <AppProvider
      navigation={NAVIGATION}
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
      <Outlet />
    </AppProvider>
  );
}

export default App;
