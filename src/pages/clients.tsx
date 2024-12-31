import { useEffect, useState } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import User from '../models/User';
import { PageContainer } from '@toolpad/core';
import { getUsersByRole, deleteUser, createUser } from '../utils/firestore';
import UserTable from '../components/UserTable';
import NewUserModal from '../components/NewUserModal';
import { Add } from '@mui/icons-material';

export default function ClientsPage() {
    const [clientUsers, setClientUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchClientUsers = async () => {
            try {
                const users = await getUsersByRole('client');
                setClientUsers(users);
            } catch (error) {
                console.error('Error fetching client users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClientUsers();
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleDeleteUser = async (email: string) => {
        try {
            await deleteUser(email);
            setClientUsers((prevUsers) =>
                prevUsers.filter((user) => user.email !== email)
            );
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUserCreated = (user: User) => {
        setClientUsers((prevUsers) => [...prevUsers, user]);
    };

    return (
        <PageContainer title="Clients" maxWidth={false}>
            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {clientUsers.length > 0 ? (
                        <UserTable
                            users={clientUsers}
                            createAction={handleOpenModal}
                            deleteAction={handleDeleteUser}
                            role="client"
                        />
                    ) : (
                        <NoClientsPage createNewClient={handleOpenModal} />
                    )}
                </>
            )}
            <NewUserModal
                open={isModalOpen}
                onClose={handleCloseModal}
                role="client"
                onUserCreated={handleUserCreated} // Pass the callback
                createUser={createUser}
            />
        </PageContainer>
    );
}

function NoClientsPage({ createNewClient }: { createNewClient: () => void }) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                No clients available.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                You can add new clients by clicking the button below.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={createNewClient}
                sx={{ mt: 2 }}
                startIcon={<Add />}
            >
                Create New Client
            </Button>
        </Box>
    );
}