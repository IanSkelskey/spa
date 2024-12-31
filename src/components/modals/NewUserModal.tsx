import React, { useState } from 'react';
import {
    TextField,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useNotifications } from '@toolpad/core';
import User from '../../models/User';
import ReusableModal from './ReusableModal';
import validateEmail from '../../utils/validateEmail';

interface NewUserModalProps {
    open: boolean;
    onClose: () => void;
    role: string;
    onUserCreated: (user: User) => void;
    createUser: (user: User) => Promise<User>;
}

const NewUserModal: React.FC<NewUserModalProps> = ({
    open,
    onClose,
    role,
    onUserCreated,
    createUser,
}) => {
    const notifications = useNotifications();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const user: User = { firstName, lastName, email, role };
            await createUser(user);
            notifications.show(
                `${role.charAt(0).toUpperCase() + role.slice(1)} member created successfully`,
                {
                    severity: 'success',
                    autoHideDuration: 3000,
                }
            );
            onUserCreated(user);
            onClose();
        } catch (error) {
            setError('Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ReusableModal open={open} onClose={onClose} title={`Create New ${role}`}>
            <form onSubmit={handleSubmit}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <div style={{ position: 'relative' }}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loading}
                        fullWidth
                    >
                        Create
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: -12,
                                marginLeft: -12,
                            }}
                        />
                    )}
                </div>
            </form>
        </ReusableModal>
    );
};

export default NewUserModal;