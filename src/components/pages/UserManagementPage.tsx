import { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import User from '../../models/User';
import { PageContainer } from '@toolpad/core';
import UserTable from '../UserTable';
import NewUserModal from '../modals/NewUserModal';
import { Add } from '@mui/icons-material';

interface UserManagementPageProps {
    role: string;
    title: string;
    noUsersMessage: string;
    users: User[];
    deleteUser: (email: string) => Promise<Response>;
    createUser: (user: User) => Promise<User>;
}

export default function UserManagementPage({
    role,
    title,
    noUsersMessage,
    users,
    deleteUser,
    createUser,
}: UserManagementPageProps) {
    const [userList, setUserList] = useState<User[]>(users);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleDeleteUser = async (email: string) => {
        try {
            await deleteUser(email);
            setUserList((prevUsers) =>
                prevUsers.filter((user) => user.email !== email)
            );
        } catch (error) {
            console.error(`Error deleting ${role} user:`, error);
        }
    };

    const handleUserCreated = (user: User) => {
        setUserList((prevUsers) => [...prevUsers, user]);
    };

    return (
        <PageContainer title={title} maxWidth={false}>
            {userList.length > 0 ? (
                <UserTable
                    users={userList}
                    createAction={handleOpenModal}
                    deleteAction={handleDeleteUser}
                    role={role}
                />
            ) : (
                <NoUsersPage
                    message={noUsersMessage}
                    createNewUser={handleOpenModal}
                />
            )}
            <NewUserModal
                open={isModalOpen}
                onClose={handleCloseModal}
                role={role}
                onUserCreated={handleUserCreated}
                createUser={createUser}
            />
        </PageContainer>
    );
}

function NoUsersPage({
    message,
    createNewUser,
}: {
    message: string;
    createNewUser: () => void;
}) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {message}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={createNewUser}
                sx={{ mt: 2 }}
                startIcon={<Add />}
            >
                Create New User
            </Button>
        </Box>
    );
}