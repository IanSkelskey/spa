import { useEffect, useState } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import User from '../models/User';
import { PageContainer } from '@toolpad/core';
import { getUsersByRole } from '../utils/firestore';
import UserTable from '../components/UserTable';
import NewUserModal from '../components/NewUserModal';

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
            >
                Create New Client
            </Button>
        </Box>
    );
}
