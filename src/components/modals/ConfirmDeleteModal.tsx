import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import ReusableModal from './ReusableModal';
import { useNotifications } from '@toolpad/core';

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    userName: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    open,
    onClose,
    onConfirm,
    userName,
}) => {
    const notifications = useNotifications();
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm();
            notifications.show('User deleted successfully', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            onClose(); // Close the modal only after the delete operation is successful
        } catch (error) {
            notifications.show('Failed to delete user', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ReusableModal open={open} onClose={onClose} title="Confirm Delete">
            <Typography variant="body1" gutterBottom>
                Are you sure you want to delete {userName}?
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button onClick={onClose} sx={{ mr: 2 }} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleConfirm}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </Box>
        </ReusableModal>
    );
};

export default ConfirmDeleteModal;
