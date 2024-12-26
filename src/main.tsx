import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App";
import DashboardLayout from "./layouts/dashboard";
import { useAuth } from "./utils/useAuth";
import LoadingFallback from "./components/LoadingFallback";

const DashboardPage = React.lazy(() => import("./pages/index"));
const ClientsPage = React.lazy(() => import("./pages/clients"));
const ProfilePage = React.lazy(() => import("./pages/profile"));

export const LogoutContext = React.createContext<() => void>(() => {});

const AppWithAuth = () => {
  const { logout } = useAuth();

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
            Component: () => (
              <DashboardLayout />
            ),
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
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
