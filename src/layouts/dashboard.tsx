import * as React from "react";
import { Outlet } from "react-router-dom";
import { DashboardLayout as CoreDashboardLayout } from "@toolpad/core";
import { LogoutContext } from "../main";
import ToolbarActionsLogout from "../components/ToolbarActionsLogout";

export default function DashboardLayout() {
  const logout = React.useContext(LogoutContext);

  return (
    <CoreDashboardLayout
      slots={{
        toolbarActions: () => <ToolbarActionsLogout logout={logout} />,
      }}
    >
      <Outlet />
    </CoreDashboardLayout>
  );
}
