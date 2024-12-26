import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import { DashboardLayout } from "@toolpad/core";
import LoadingFallback from "./components/LoadingFallback";
import SidebarFooter from "./components/SidebarFooter";
import ToolbarActionsLogout from "./components/ToolbarActionsLogout";

const DashboardPage = React.lazy(() => import("./pages/index"));
const ClientsPage = React.lazy(() => import("./pages/clients"));
const ProfilePage = React.lazy(() => import("./pages/profile"));

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: () => (
          <React.Suspense fallback={<LoadingFallback />}>
            <DashboardLayout
              slots={{
                sidebarFooter: SidebarFooter,
                toolbarActions: () => <ToolbarActionsLogout logout={() => {}} />,
              }}
            >
              <React.Suspense fallback={<LoadingFallback />}>
                <Outlet />
              </React.Suspense>
            </DashboardLayout>
          </React.Suspense>
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
