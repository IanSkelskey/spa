import { useEffect, useState } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import User from '../models/User';
import { PageContainer } from '@toolpad/core';
import { getUsersByRole } from '../utils/firestore';
import UserTable from '../components/UserTable';
import NewUserModal from '../components/NewUserModal';

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
            >
                Create New Staff Member
            </Button>
        </Box>
    );
}
