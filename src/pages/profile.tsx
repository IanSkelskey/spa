import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { PageContainer, useNotifications } from '@toolpad/core';
import { Box, Avatar, CircularProgress, IconButton, Fab } from '@mui/material';
import User from '../models/User';
import { useAuth } from '../utils/useAuth';
import UploadProfileImageModal from '../components/modals/UploadProfileImageModal';
import ImageViewModal from '../components/modals/ImageViewModal';
import { uploadImage, getImageUrl } from '../utils/storage';

const ProfilePage = () => {
    const { user, profilePicture, setProfilePicture } = useAuth();
    const notifications = useNotifications();
    const [currentUser, setCurrentUser] = useState<User | null>(user);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isImageViewModalOpen, setIsImageViewModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    const handleUploadClick = async (file: File) => {
        if (currentUser) {
            const path = `users/${currentUser.email}/profile.jpg`;
            setLoading(true);
            try {
                await uploadImage(file, path);
                const url = await getImageUrl(path);
                setProfilePicture(url);
                notifications.show('Profile picture uploaded successfully!', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                notifications.show('Failed to upload profile picture.', {
                    severity: 'error',
                    autoHideDuration: 3000,
                });
            } finally {
                setLoading(false);
            }
        }
    };

    if (!currentUser) {
        return (
            <PageContainer title="Profile" maxWidth={false}>
                <Typography variant="h6" gutterBottom>
                    No user is logged in.
                </Typography>
            </PageContainer>
        );
    }

    return (
        <PageContainer title="Profile" maxWidth={false}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Box position="relative" display="inline-block">
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Avatar
                            src={profilePicture || ''}
                            alt={currentUser.displayName || `${currentUser.firstName} ${currentUser.lastName}`}
                            sx={{ width: 100, height: 100, mb: 2, cursor: 'pointer' }}
                            onClick={() => setIsImageViewModalOpen(true)}
                        />
                    )}
                    <Tooltip title="Edit Profile Picture">
                        <Fab
                            color="primary"
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                zIndex: 1,
                            }}
                            onClick={() => setIsUploadModalOpen(true)}
                        >
                            <EditIcon />
                        </Fab>
                    </Tooltip>
                </Box>
                <Typography variant="h5" gutterBottom>
                    {currentUser.displayName || `${currentUser.firstName} ${currentUser.lastName}`}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {currentUser.email}
                </Typography>
                <UploadProfileImageModal
                    open={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    onUpload={handleUploadClick}
                />
                {profilePicture && (
                    <ImageViewModal
                        open={isImageViewModalOpen}
                        onClose={() => setIsImageViewModalOpen(false)}
                        imageUrl={profilePicture}
                        title="Profile Picture"
                    />
                )}
            </Box>
        </PageContainer>
    );
};

export default ProfilePage;