import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Handle email submission logic here
		navigate('/sent');
	};

	return (
		<Container maxWidth="sm">
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				height="100vh"
			>
				<Typography variant="h4" component="h1" gutterBottom>
					Forgot Password
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Button type="submit" variant="contained" color="primary" fullWidth>
						Submit
					</Button>
				</form>
			</Box>
		</Container>
	);
};

export default ForgotPasswordPage;