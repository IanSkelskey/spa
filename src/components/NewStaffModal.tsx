import { createUser } from "../utils/firestore";
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, CircularProgress } from '@mui/material';
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
	const role = 'staff'; // Set role to 'staff' by default

	const handleSubmit = async () => {
		setLoading(true); // Set loading to true when the submit starts
		await createUser(firstName, lastName, email, role).then(() => {
			notifications.show("Staff member created successfully", { severity: "success", autoHideDuration: 3000 });
			onClose();
		}).catch((error) => {
			notifications.show(`Error creating staff member: ${error.message}`, { severity: "error", autoHideDuration: 3000 });
		}).finally(() => {
			setLoading(false); // Set loading to false when the submit ends
		});
	};

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
					onClick={handleSubmit} 
					sx={{ mt: 2 }} 
					disabled={loading} // Disable button when loading
					startIcon={loading && <CircularProgress size={20} />} // Show loading indicator
				>
					{loading ? 'Creating...' : 'Create'}
				</Button>
			</Box>
		</Modal>
	);
};

export default NewStaffModal;
