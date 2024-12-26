import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App";
import DashboardLayout from "./layouts/dashboard";
import { useAuth } from "./utils/useAuth";
import LoadingFallback from "./components/LoadingFallback";

const DashboardPage = React.lazy(() => import("./pages/index"));
const ClientsPage = React.lazy(() => import("./pages/clients"));
const StaffPage = React.lazy(() => import("./pages/staff"));
const ProfilePage = React.lazy(() => import("./pages/profile"));
const LoginPage = React.lazy(() => import("./pages/login"));

export const LogoutContext = React.createContext<() => void>(() => {});

const AppWithAuth = () => {
  const { user, login, logout } = useAuth();

  // If no user is provided, always render the login page
  if (!user) {
    return <LoginPage login={login} />;
  }

  return (
    <LogoutContext.Provider value={logout}>
      <React.Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </React.Suspense>
    </LogoutContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: AppWithAuth,
        children: [
          {
            path: "/",
            Component: () => <DashboardLayout />,
            children: [
              {
                path: "dashboard",
                Component: DashboardPage,
              },
              {
                path: "clients",
                Component: ClientsPage,
              },
              {
                path: "profile",
                Component: ProfilePage,
              },
              {
                path: "staff",
                Component: StaffPage,
              }
            ],
          },
        ],
      },
      {
        path: "/login",
        Component: () => {
          const { login } = useAuth();
          return <LoginPage login={login} />;
        },  // Ensure the login page is accessible directly via /login
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
