import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, CircularProgress, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../utils/useAuth';

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
		<Modal open={open} onClose={onClose}>
			<Box sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 400,
				maxHeight: '80vh',
				bgcolor: 'background.paper',
				boxShadow: 24,
				borderRadius: 1,
				p: 4
			}}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
					<Typography variant="h6">Forgot Password</Typography>
					<Tooltip title="Close">
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Tooltip>
				</Box>
				{success ? (
					<Typography variant="body2">
						If an account exists with that email, a link will arrive soon.
					</Typography>
				) : (
					<form onSubmit={handleSubmit}>
						<Typography variant='body2' sx={{ mb: 2 }}>
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
			</Box>
		</Modal>
	);
};

export default ForgotPasswordModal;