import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PageContainer } from '@toolpad/core';
import { Box } from '@mui/material';
import User from '../models/User';
import { useAuth } from '../utils/useAuth';

const ProfilePage = () => {
    const { user } = useAuth();
    const [currentUser, setCurrentUser] = useState<User | null>(user);

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

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
            <Typography variant="h5" gutterBottom>
                {currentUser.displayName || `${currentUser.firstName} ${currentUser.lastName}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {currentUser.email}
            </Typography>
            <Box position="fixed" bottom={16} right={16}>
                <Tooltip title="Edit Profile">
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: '50%',
                            minWidth: 56,
                            minHeight: 56,
                        }}
                    >
                        <EditIcon />
                    </Button>
                </Tooltip>
            </Box>
        </PageContainer>
    );
};

export default ProfilePage;