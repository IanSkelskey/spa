import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout as CoreDashboardLayout } from '@toolpad/core';
import { LogoutContext } from '../main';
import ToolbarActionsAccount from '../components/ToolbarActionsAccount';
import SidebarFooter from '../components/SidebarFooter';

export default function DashboardLayout() {
    const logout = React.useContext(LogoutContext);

    return (
        <CoreDashboardLayout
            slots={{
                sidebarFooter: SidebarFooter,
                toolbarActions: () => <ToolbarActionsAccount logout={logout} />,
            }}
        >
            <Outlet />
        </CoreDashboardLayout>
    );
}
