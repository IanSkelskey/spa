import { createUser } from "../utils/firestore";
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface NewStaffModalProps {
	open: boolean;
	onClose: () => void;
}

const NewStaffModal: React.FC<NewStaffModalProps> = ({ open, onClose }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const role = 'staff'; // Set role to 'staff' by default

	const handleSubmit = async () => {
		await createUser(firstName, lastName, email, role);
		onClose();
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
				<Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
					Create
				</Button>
			</Box>
		</Modal>
	);
};

export default NewStaffModal;
