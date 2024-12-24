import { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { PageContainer } from '@toolpad/core';
import LoginModal from './LoginModal';

function LandingPage() {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const handleOpenLoginModal = () => {
		setIsLoginModalOpen(true);
	};

	const handleCloseLoginModal = () => {
		setIsLoginModalOpen(false);
	};

	return (
		<PageContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
			<Typography variant="h3" component="h1" gutterBottom>
				Welcome to Spa Dashboard
			</Typography>
			<Typography variant="h6" component="p" gutterBottom>
				Manage your spa appointments and services with ease.
			</Typography>
			<Button variant="contained" color="primary" size="large" onClick={handleOpenLoginModal}>
				Login
			</Button>
			{isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />}
		</PageContainer>
	);
};

export default LandingPage;