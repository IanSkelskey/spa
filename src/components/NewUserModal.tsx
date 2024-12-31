// src/components/NewUserModal.tsx
import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
    Tooltip,
} from '@mui/material';
import { useNotifications } from '@toolpad/core';
import { createUser } from '../utils/firestore';
import User from '../models/User';
import ReusableModal from './ReusableModal';

interface NewUserModalProps {
    open: boolean;
    onClose: () => void;
    role: string;
    onUserCreated: (user: User) => void; // Add this line
}

const NewUserModal: React.FC<NewUserModalProps> = ({ open, onClose, role, onUserCreated }) => { // Update this line
    const notifications = useNotifications(); // Hook for notifications
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }
        setLoading(true); // Set loading to true when the submit starts
        setError(''); // Clear any previous errors

        try {
            const user: User = { firstName, lastName, email, role };
            await createUser(user); // Create user in Firestore
            notifications.show(
                `${role.charAt(0).toUpperCase() + role.slice(1)} member created successfully`,
                {
                    severity: 'success',
                    autoHideDuration: 3000,
                }
            );
            onUserCreated(user); // Call the callback function
            onClose();
        } catch (error: any) {
            setError(`Error creating ${role} member: ${error.message}`);
        } finally {
            setLoading(false); // Set loading to false when the submit ends
        }
    };

    const isFormValid = firstName && lastName && email; // Check if form is valid

    return (
        <ReusableModal
            open={open}
            onClose={onClose}
            title={`Create New ${role.charAt(0).toUpperCase() + role.slice(1)}`}
        >
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Enter the details of the new {role} member
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    fullWidth
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Tooltip title="Create new user" arrow>
                    <span>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                            disabled={loading || !isFormValid} // Disable button when loading or form is invalid
                            startIcon={loading && <CircularProgress size={20} />} // Show loading indicator
                        >
                            {loading ? 'Creating...' : 'Create'}
                        </Button>
                    </span>
                </Tooltip>
            </form>
        </ReusableModal>
    );
};

export default NewUserModal;

function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}