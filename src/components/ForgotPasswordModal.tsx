// src/components/ForgotPasswordModal.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useAuth } from '../utils/useAuth';
import ReusableModal from './ReusableModal';

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ open, onClose }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReusableModal open={open} onClose={onClose} title="Forgot Password">
      {success ? (
        <Typography variant="body2">
          If an account exists with that email, a link will arrive soon.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Typography variant='body2' color='textSecondary' sx={{ mb: 2 }}>
            Enter your email to receive a password reset link.
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }} 
            disabled={loading} // Disable button when loading
            startIcon={loading && <CircularProgress size={20} />} // Show loading indicator
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      )}
    </ReusableModal>
  );
};

export default ForgotPasswordModal;