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

export default function StaffDetailsPage() {
    const { email } = useParams<{ email: string }>();
    const [staff, setStaff] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isImageViewModalOpen, setIsImageViewModalOpen] = useState(false);
    const notifications = useNotifications();

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                if (email) {
                    const user = await getUserByEmail(email);
                    setStaff(user);
                    const profilePicPath = `users/${email}/profile.jpg`;
                    const profilePicUrl = await getImageUrl(profilePicPath);
                    setProfilePicture(profilePicUrl);
                }
            } catch (error) {
                console.error('Error fetching staff:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, [email]);

    const handleProfilePictureClick = () => {
        if (profilePicture) {
            setIsImageViewModalOpen(true);
        } else {
            notifications.show(
                `No profile picture set for ${staff?.firstName} ${staff?.lastName}`,
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

    if (!staff) {
        return (
            <PageContainer title="Staff Details" maxWidth={false}>
                <Typography variant="h6" gutterBottom>
                    Staff member not found.
                </Typography>
            </PageContainer>
        );
    }

    return (
        <PageContainer title="Staff Details" maxWidth={false}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Box position="relative" display="inline-block">
                    <Tooltip title="View Profile Picture">
                        <Avatar
                            src={profilePicture || ''}
                            alt={`${staff.firstName} ${staff.lastName}`}
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
                    {staff.firstName} {staff.lastName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Email: {staff.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Role: {staff.role}
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
