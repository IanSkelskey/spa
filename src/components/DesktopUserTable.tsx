import React, { useState, useEffect } from 'react';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import User from '../models/User';
import { Button, Tooltip, IconButton, Avatar } from '@mui/material';
import { Add, Delete, Info } from '@mui/icons-material';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import ImageViewModal from './modals/ImageViewModal';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/storage';
import { useNotifications } from '@toolpad/core';

interface DesktopUserTableProps {
    users: User[];
    createAction: () => void;
    deleteAction: (email: string) => void;
    role?: string;
}

const DesktopUserTable: React.FC<DesktopUserTableProps> = ({
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

    const columns: GridColDef[] = [
        {
            field: 'profilePicture',
            headerName: 'Photo',
            width: 64,
            renderCell: (params) => (
                <Tooltip title="View Profile Picture">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            cursor: 'pointer',
                        }}
                        onClick={() =>
                            handleProfilePictureClick(
                                profilePictures[params.row.email],
                                params.row
                            )
                        }
                    >
                        <Avatar
                            src={profilePictures[params.row.email] || ''}
                            alt={`${params.row.firstName} ${params.row.lastName}`}
                            sx={{ width: 32, height: 32 }}
                        />
                    </div>
                </Tooltip>
            ),
        },
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <Link
                        to={`/${role === 'client' ? 'clients' : role}/${params.row.email}`}
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
                            onClick={() =>
                                handleDeleteClick(params.row as User)
                            }
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const rows = users.map((user, index) => ({ ...user, id: index }));

    const CustomToolbar: React.FC = () => {
        return (
            <GridToolbarContainer style={{ padding: '4px 16px' }}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <Tooltip title={`Create new ${role || 'user'}`}>
                    <Button
                        color="primary"
                        startIcon={<Add />}
                        onClick={createAction}
                    >
                        New {role || 'user'}
                    </Button>
                </Tooltip>
                <Tooltip title="Delete selected users">
                    <span>
                        <Button
                            color="error"
                            startIcon={<Delete />}
                            onClick={handleBatchDeleteClick}
                            disabled={checked.length === 0}
                        >
                            Delete Selected
                        </Button>
                    </span>
                </Tooltip>
            </GridToolbarContainer>
        );
    };

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                pageSizeOptions={[25, 50, 100]}
                checkboxSelection
                slots={{
                    toolbar: () => <CustomToolbar />,
                }}
                onRowSelectionModelChange={(newSelection) => {
                    setChecked(newSelection as number[]);
                }}
            />
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

export default DesktopUserTable;
