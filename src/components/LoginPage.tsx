import { AuthProvider, SignInPage } from '@toolpad/core/SignInPage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig'; // Import the app instance
import { useNavigate } from 'react-router-dom';

interface AuthResponse {
	user?: any;
	error?: string;
}

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const LoginPage = () => {
	const navigate = useNavigate();

	const signIn = async (provider: AuthProvider, formData: FormData, _callbackUrl?: string): Promise<AuthResponse> => {
		console.log('FormData:', formData); // Debugging line
		if (provider.id === 'credentials') {
			const auth = getAuth(app);
			try {
				const email = formData.get('email') as string;
				const password = formData.get('password') as string;
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				console.log('User signed in:', userCredential);
				navigate('/admin-dashboard');
				return { user: userCredential.user };
			} catch (error) {
				console.error('Error during sign-in:', error); // Debugging line
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
