import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Box,
    CircularProgress,
    Avatar,
    Tooltip,
} from '@mui/material';
import { PageContainer, useNotifications } from '@toolpad/core';
import { getUserByEmail } from '../utils/firestore';
import User from '../models/User';
import { getImageUrl } from '../utils/storage';
import ImageViewModal from '../components/modals/ImageViewModal';

export default function ClientDetailsPage() {
    const { email } = useParams<{ email: string }>();
    const [client, setClient] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isImageViewModalOpen, setIsImageViewModalOpen] = useState(false);
    const notifications = useNotifications();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                if (email) {
                    const user = await getUserByEmail(email);
                    setClient(user);
                    const profilePicPath = `users/${email}/profile.jpg`;
                    const profilePicUrl = await getImageUrl(profilePicPath);
                    setProfilePicture(profilePicUrl);
                }
            } catch (error) {
                console.error('Error fetching client:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClient();
    }, [email]);

    const handleProfilePictureClick = () => {
        if (profilePicture) {
            setIsImageViewModalOpen(true);
        } else {
            notifications.show(
                `No profile picture set for ${client?.firstName} ${client?.lastName}`,
                {
                    severity: 'info',
                    autoHideDuration: 3000,
                }
            );
        }
    };

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
            <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Box position="relative" display="inline-block">
                    <Tooltip title="View Profile Picture">
                        <Avatar
                            src={profilePicture || ''}
                            alt={`${client.firstName} ${client.lastName}`}
                            sx={{
                                width: 100,
                                height: 100,
                                mb: 2,
                                cursor: 'pointer',
                            }}
                            onClick={handleProfilePictureClick}
                        />
                    </Tooltip>
                </Box>
                <Typography variant="h5" gutterBottom>
                    {client.firstName} {client.lastName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Email: {client.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Role: {client.role}
                </Typography>
            </Box>
            {profilePicture && (
                <ImageViewModal
                    open={isImageViewModalOpen}
                    onClose={() => setIsImageViewModalOpen(false)}
                    imageUrl={profilePicture}
                    title="Profile Picture"
                />
            )}
        </PageContainer>
    );
}
