import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    IconButton,
    Tooltip,
    Fab,
    Avatar,
} from '@mui/material';
import { Add, Delete, Info } from '@mui/icons-material';
import User from '../models/User';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import ImageViewModal from './modals/ImageViewModal';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/storage';
import { useNotifications } from '@toolpad/core';

interface MobileUserTableProps {
    users: User[];
    createAction: () => void;
    deleteAction: (email: string) => void;
    role?: string;
}

const MobileUserTable: React.FC<MobileUserTableProps> = ({
    users,
    createAction,
    deleteAction,
    role,
}) => {
    const [checked, setChecked] = useState<number[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [profilePictures, setProfilePictures] = useState<{
        [email: string]: string | null;
    }>({});
    const [isImageViewModalOpen, setIsImageViewModalOpen] = useState(false);
    const [imageViewUrl, setImageViewUrl] = useState<string | null>(null);
    const notifications = useNotifications();

    useEffect(() => {
        const fetchProfilePictures = async () => {
            const pictures: { [email: string]: string | null } = {};
            for (const user of users) {
                try {
                    const profilePicPath = `users/${user.email}/profile.jpg`;
                    const profilePicUrl = await getImageUrl(profilePicPath);
                    pictures[user.email] = profilePicUrl;
                } catch (error) {
                    console.error('Error fetching profile picture:', error);
                    pictures[user.email] = null;
                }
            }
            setProfilePictures(pictures);
        };
        fetchProfilePictures();
    }, [users]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleDeleteClick = (user: User) => {
        setSelectedUsers([user]);
        setIsDeleteModalOpen(true);
    };

    const handleBatchDeleteClick = () => {
        const selected = users.filter((_user, index) =>
            checked.includes(index)
        );
        setSelectedUsers(selected);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        for (const user of selectedUsers) {
            await deleteAction(user.email); // Await the delete action
        }
        setIsDeleteModalOpen(false);
        setChecked([]);
    };

    const handleProfilePictureClick = (url: string | null, user: User) => {
        if (url) {
            setImageViewUrl(url);
            setIsImageViewModalOpen(true);
        } else {
            notifications.show(
                `No profile picture set for ${user.firstName} ${user.lastName}`,
                {
                    severity: 'info',
                    autoHideDuration: 3000,
                }
            );
        }
    };

    return (
        <>
            <List>
                {users.map((user, index) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                        <ListItem key={index} divider>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.includes(index)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    onClick={handleToggle(index)}
                                />
                            </ListItemIcon>
                            <ListItemIcon>
                                <Tooltip title="View Profile Picture">
                                    <Avatar
                                        src={profilePictures[user.email] || ''}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            handleProfilePictureClick(
                                                profilePictures[user.email],
                                                user
                                            )
                                        }
                                    />
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={
                                    <span style={{ fontWeight: 'bold' }}>
                                        {user.firstName} {user.lastName}
                                    </span>
                                }
                                secondary={
                                    <>
                                        <span
                                            style={{
                                                display: 'block',
                                                color: 'gray',
                                            }}
                                        >
                                            {user.role}
                                        </span>
                                    </>
                                }
                            />
                            <Link
                                to={`/${role === 'client' ? 'clients' : role}/${user.email}`}
                            >
                                <Tooltip title="View Details">
                                    <IconButton color="primary">
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <Tooltip title="Delete User">
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteClick(user)}
                                >
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                    );
                })}
            </List>
            <Tooltip title={`Create new ${role || 'user'}`}>
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={createAction}
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <Add />
                </Fab>
            </Tooltip>
            <Tooltip title="Delete selected users">
                <span>
                    <Fab
                        color="error"
                        aria-label="delete"
                        onClick={handleBatchDeleteClick}
                        sx={{ position: 'fixed', bottom: 16, right: 80 }}
                        disabled={checked.length === 0}
                    >
                        <Delete />
                    </Fab>
                </span>
            </Tooltip>
            {selectedUsers.length > 0 && (
                <ConfirmDeleteModal
                    open={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    userName={
                        selectedUsers.length === 1
                            ? `${selectedUsers[0].firstName} ${selectedUsers[0].lastName}`
                            : `${selectedUsers.length} users`
                    }
                />
            )}
            {imageViewUrl && (
                <ImageViewModal
                    open={isImageViewModalOpen}
                    onClose={() => setIsImageViewModalOpen(false)}
                    imageUrl={imageViewUrl}
                    title="Profile Picture"
                />
            )}
        </>
    );
};

export default MobileUserTable;
