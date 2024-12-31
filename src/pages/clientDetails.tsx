import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import { PageContainer } from '@toolpad/core';
import { getUserByEmail } from '../utils/firestore';
import User from '../models/User';

export default function ClientDetailsPage() {
    const { email } = useParams<{ email: string }>();
    const [client, setClient] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                if (email) {
                    const user = await getUserByEmail(email);
                    setClient(user);
                }
            } catch (error) {
                console.error('Error fetching client:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClient();
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

    if (!client) {
        return (
            <PageContainer title="Client Details" maxWidth={false}>
                <Typography variant="h6" gutterBottom>
                    Client not found.
                </Typography>
            </PageContainer>
        );
    }

    return (
        <PageContainer title="Client Details" maxWidth={false}>
            <Typography variant="h5" gutterBottom>
                {client.firstName} {client.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Email: {client.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Role: {client.role}
            </Typography>
        </PageContainer>
    );
}