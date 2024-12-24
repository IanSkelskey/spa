import { AuthProvider, SignInPage } from '@toolpad/core/SignInPage';

interface AuthResponse {
	user?: any;
	error?: string;
}
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const LoginPage = () => {
	const navigate = useNavigate();

	const signIn = async (provider: AuthProvider, credentials: any): Promise<AuthResponse> => {
		if (provider.id === 'credentials') {
			const auth = getAuth();
			try {
				const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
				navigate('/admin-dashboard'); // Redirect on successful login
				return { user: userCredential.user };
			} catch (error) {
				return { error: (error as any).message };
			}
		}
		return { error: 'Invalid provider' };
	};


	return (
		<SignInPage
			signIn={signIn}
			providers={providers}
			slotProps={{
				emailField: { label: 'Email', required: true },
				passwordField: { label: 'Password', required: true },
			}}
		/>

	);
};

export default LoginPage;
