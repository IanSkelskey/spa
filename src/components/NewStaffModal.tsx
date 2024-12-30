// src/components/NewStaffModal.tsx
import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { useNotifications } from "@toolpad/core";
import { createUser } from "../utils/firestore";
import User from '../models/User';
import ReusableModal from './ReusableModal';

interface NewStaffModalProps {
  open: boolean;
  onClose: () => void;
}

const NewStaffModal: React.FC<NewStaffModalProps> = ({ open, onClose }) => {
  const notifications = useNotifications(); // Hook for notifications
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const role = 'staff'; // Set role to 'staff' by default

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
      notifications.show("Staff member created successfully", { severity: "success", autoHideDuration: 3000 });
      onClose();
    } catch (error: any) {
      setError(`Error creating staff member: ${error.message}`);
    } finally {
      setLoading(false); // Set loading to false when the submit ends
    }
  };

  const isFormValid = firstName && lastName && email; // Check if form is valid

  return (
    <ReusableModal open={open} onClose={onClose} title="Create New Staff">
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Enter the details of the new staff member</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
      </form>
    </ReusableModal>
  );
};

export default NewStaffModal;

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}