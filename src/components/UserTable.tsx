// src/components/UserTable.tsx
import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import User from '../models/User';
import MobileUserTable from './MobileUserTable';
import DesktopUserTable from './DesktopUserTable';

interface UserTableProps {
    users: User[];
    createAction: () => void;
    deleteAction: (email: string) => void;
    role?: string;
}

const UserTable: React.FC<UserTableProps> = ({
    users,
    createAction,
    deleteAction,
    role,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return isMobile ? (
        <MobileUserTable
            users={users}
            createAction={createAction}
            deleteAction={deleteAction}
            role={role}
        />
    ) : (
        <DesktopUserTable
            users={users}
            createAction={createAction}
            deleteAction={deleteAction}
            role={role}
        />
    );
};

export default UserTable;