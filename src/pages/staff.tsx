// src/pages/staff.tsx
import { useEffect, useState } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import User from '../models/User';
import { PageContainer } from '@toolpad/core';
import { getUsersByRole, deleteUser, createUser } from '../utils/firestore';
import UserTable from '../components/UserTable';
import NewUserModal from '../components/NewUserModal';
import { Add } from '@mui/icons-material';

export default function StaffPage() {
    const [staffUsers, setStaffUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchStaffUsers = async () => {
            try {
                const users = await getUsersByRole('staff');
                setStaffUsers(users);
            } catch (error) {
                console.error('Error fetching staff users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaffUsers();
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleDeleteUser = async (email: string) => {
        try {
            await deleteUser(email);
            setStaffUsers((prevUsers) =>
                prevUsers.filter((user) => user.email !== email)
            );
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUserCreated = (user: User) => {
        setStaffUsers((prevUsers) => [...prevUsers, user]);
    };

    return (
        <PageContainer title="Staff Members" maxWidth={false}>
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
                    {staffUsers.length > 0 ? (
                        <UserTable
                            role="staff"
                            users={staffUsers}
                            createAction={handleOpenModal}
                            deleteAction={handleDeleteUser}
                        />
                    ) : (
                        <NoStaffPage createNewStaff={handleOpenModal} />
                    )}
                </>
            )}
            <NewUserModal
                open={isModalOpen}
                onClose={handleCloseModal}
                role="staff"
                onUserCreated={handleUserCreated} // Pass the callback
                createUser={createUser}
            />
        </PageContainer>
    );
}

function NoStaffPage({ createNewStaff }: { createNewStaff: () => void }) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                No staff members available.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                You can add new staff members by clicking the button below.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={createNewStaff}
                sx={{ mt: 2 }}
                startIcon={<Add />}
            >
                Create New Staff Member
            </Button>
        </Box>
    );
}
