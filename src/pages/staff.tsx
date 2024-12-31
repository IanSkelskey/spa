import { useEffect, useState } from 'react';
import UserManagementPage from '../components/pages/UserManagementPage';
import { getUsersByRole, deleteUser, createUser } from '../utils/firestore';
import User from '../models/User';
import { CircularProgress, Box } from '@mui/material';

export default function StaffPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsersByRole('staff');
                setUsers(users);
            } catch (error) {
                console.error('Error fetching staff users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <UserManagementPage
            role="staff"
            title="Staff Members"
            noUsersMessage="No staff members available."
            users={users}
            deleteUser={deleteUser}
            createUser={createUser}
        />
    );
}
