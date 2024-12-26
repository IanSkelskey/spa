import * as React from "react";
import { PageContainer } from "@toolpad/core";

export function useNavigation(role: string) {
  const [routes, setRoutes] = React.useState<
    { path: string; component: JSX.Element }[]
  >([]);

  React.useEffect(() => {
    if (role === "owner" || role === "staff") {
      setRoutes([
        {
          path: "dashboard",
          component: <PageContainer title="Dashboard">Dashboard Content</PageContainer>,
        },
        {
          path: "clients",
          component: <PageContainer title="Clients">Clients Content</PageContainer>,
        },
      ]);
    } else if (role === "client") {
      setRoutes([
        {
          path: "profile",
          component: <PageContainer title="Profile">Profile Content</PageContainer>,
        },
      ]);
    }
  }, [role]);

  return { routes };
}
