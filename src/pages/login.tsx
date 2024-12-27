import { useState } from 'react';
import { AuthProvider, SignInPage } from '@toolpad/core/SignInPage';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

interface AuthResponse {
	user?: any;
	error?: string;
}

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const LoginPage = ({ login }: { login: (email: string, password: string) => void | Promise<AuthResponse> }) => {
	const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);

	const signIn = async (_provider: AuthProvider, formData?: any, _callbackUrl?: string) => {
		try {
			const email = formData.get('email') as string;
			const password = formData.get('password') as string;
			const userCredential = await login(email, password);
			if (userCredential && 'user' in userCredential) {
				return { user: userCredential.user };
			}
			return { error: 'Login failed' };

		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.message.includes('auth/invalid-credential')) {
					return { error: 'Invalid email or password' };
				}
				return { error: 'An unknown error occurred: ' + error.message };
			}
			return { error: 'An unknown error occurred' };
		}
	};

	return (
		<>
			<SignInPage
				signIn={signIn}
				providers={providers}
				slots={{
					forgotPasswordLink: () => (
						<Link onClick={() => setForgotPasswordModalOpen(true)} to={''}>
							<Typography variant="body2">Forgot Password?</Typography>
						</Link>
					),
				}}
				slotProps={{
					emailField: { label: 'Email', required: true },
					passwordField: { label: 'Password', required: true },
				}}
			/>
			<ForgotPasswordModal
				open={isForgotPasswordModalOpen}
				onClose={() => setForgotPasswordModalOpen(false)}
			/>
		</>
	);
};

export default LoginPage;
