import { createUser } from "../utils/firestore";
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, CircularProgress, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNotifications } from "@toolpad/core";

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
		await createUser(firstName, lastName, email, role).then(() => {
			notifications.show("Staff member created successfully", { severity: "success", autoHideDuration: 3000 });
			onClose();
		}).catch((error) => {
			setError(`Error creating staff member: ${error.message}`);
		}).finally(() => {
			setLoading(false); // Set loading to false when the submit ends
		});
	};

	const isFormValid = firstName && lastName && email; // Check if form is valid

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={{ 
				position: 'absolute', 
				top: '50%', 
				left: '50%', 
				transform: 'translate(-50%, -50%)', 
				width: 400, 
				bgcolor: 'background.paper', 
				boxShadow: 24, 
				borderRadius: 1, 
				p: 4 
			}}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography variant="h6">Create New Staff</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
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
			</Box>
		</Modal>
	);
};

export default NewStaffModal;

function validateEmail(email: string) {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
}