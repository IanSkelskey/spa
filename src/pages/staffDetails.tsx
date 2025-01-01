// src/pages/staffDetails.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import { PageContainer } from '@toolpad/core';
import { getUserByEmail } from '../utils/firestore';
import User from '../models/User';

export default function StaffDetailsPage() {
    const { email } = useParams<{ email: string }>();
    const [staff, setStaff] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                if (email) {
                    const user = await getUserByEmail(email);
                    setStaff(user);
                }
            } catch (error) {
                console.error('Error fetching staff:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, [email]);

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

    if (!staff) {
        return (
            <PageContainer title="Staff Details" maxWidth={false}>
                <Typography variant="h6" gutterBottom>
                    Staff not found.
                </Typography>
            </PageContainer>
        );
    }

    return (
        <PageContainer title="Staff Details" maxWidth={false}>
            <Typography variant="h5" gutterBottom>
                {staff.firstName} {staff.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Email: {staff.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Role: {staff.role}
            </Typography>
        </PageContainer>
    );
}
