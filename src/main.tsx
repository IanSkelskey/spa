import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App";
import DashboardLayout from "./layouts/dashboard";
import { useAuth } from "./utils/useAuth";
import LoadingFallback from "./components/LoadingFallback";
import { getUserRole } from "./utils/firestore";
import { PageContainer } from "@toolpad/core";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

const DashboardPage = React.lazy(() => import("./pages/index"));
const ClientsPage = React.lazy(() => import("./pages/clients"));
const StaffPage = React.lazy(() => import("./pages/staff"));
const ProfilePage = React.lazy(() => import("./pages/profile"));
const LoginPage = React.lazy(() => import("./pages/login"));
const HomePage = React.lazy(() => import("./pages/home"));
const NotFoundPage = React.lazy(() => import("./pages/404"));
const ForgotPasswordPage = React.lazy(() => import("./pages/forgot"));

export const LogoutContext = React.createContext<() => void>(() => { });

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

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user } = useAuth();
  const [role, setRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user && user.email) {
      getUserRole(user.email).then(setRole);
    }
  }, [user]);

  if (role === null) {
    return <LoadingFallback />;
  }

  if (!allowedRoles.includes(role)) {
    return <PageContainer title="Unauthorized">You are not authorized to view this page.</PageContainer>;
  } else {
    return <>{children}</>;
  }
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
                path: "",
                Component: HomePage,
              },
              {
                path: "dashboard",
                Component: DashboardPage,
              },
              {
                path: "clients",
                element: (
                  <ProtectedRoute allowedRoles={["staff", "owner"]}>
                    <ClientsPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: "profile",
                Component: ProfilePage,
              },
              {
                path: "staff",
                element: (
                  <ProtectedRoute allowedRoles={["owner"]}>
                    <StaffPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: "*", // Catch-all for undefined routes
                Component: NotFoundPage,
              },
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
    <NotificationsProvider>
      <RouterProvider router={router} />
    </NotificationsProvider>
  </React.StrictMode>
);
