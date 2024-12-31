// src/components/MobileUserTable.tsx
import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    IconButton,
    Tooltip,
    Fab,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import User from '../models/User';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import DOMPurify from 'dompurify';

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
            deleteAction(user.email);
        }
        setIsDeleteModalOpen(false);
        setChecked([]);
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
                            <ListItemText
                                id={labelId}
                                primary={
                                    <span style={{ fontWeight: 'bold' }}>
                                        {user.firstName} {user.lastName}
                                    </span>
                                }
                                secondary={
                                    <>
                                        <a
                                            href={`mailto:${DOMPurify.sanitize(user.email)}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}
                                        >
                                            {DOMPurify.sanitize(user.email)}
                                        </a>
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
                            <IconButton
                                color="error"
                                onClick={() => handleDeleteClick(user)}
                            >
                                <Delete />
                            </IconButton>
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
        </>
    );
};

export default MobileUserTable;
