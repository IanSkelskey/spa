import { IconButton, Tooltip, Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import React, { useState } from 'react';

function ToolbarActionsAccount({ logout }: { logout: () => void }) {
    const { user, profilePicture } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        handleMenuClose();
    };

    const handleLogoutClick = () => {
        logout();
        handleMenuClose();
    };

    return (
        <Box display="flex" alignItems="center">
            {user && (
                <>
                    <Tooltip title="Open profile menu">
                        <IconButton
                            color="primary"
                            onClick={handleMenuOpen}
                        >
                            <Avatar
                                src={profilePicture || ''}
                                alt={user.displayName || `${user.firstName} ${user.lastName}`}
                                sx={{ width: 32, height: 32 }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <Tooltip title="Go to profile">
                            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                        </Tooltip>
                        <Tooltip title="Log out">
                            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                        </Tooltip>
                    </Menu>
                </>
            )}
        </Box>
    );
}

export default ToolbarActionsAccount;