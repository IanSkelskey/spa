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
        <Box display="flex" alignItems="center" overflow="hidden" paddingRight={4}>
            {user && (
                <>
                    <Tooltip title="Open profile menu" disableInteractive>
                        <IconButton
                            color="primary"
                            onClick={handleMenuOpen}
                            sx={{ p: 0 }}
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
                        PaperProps={{
                            style: {
                                maxHeight: '40vh',
                                overflow: 'auto',
                            },
                        }}
                    >
                        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                    </Menu>
                </>
            )}
        </Box>
    );
}

export default ToolbarActionsAccount;