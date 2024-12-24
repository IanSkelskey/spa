import { AuthProvider, SignInPage } from '@toolpad/core/SignInPage';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

interface AuthResponse {
	user?: any;
	error?: string;
}

const providers = [{ id: 'credentials', name: 'Email and Password' }];

import { Auth } from 'firebase/auth';

const LoginPage = ({ auth, signInWithEmailAndPassword }: { auth: Auth, signInWithEmailAndPassword: (auth: Auth, email: string, password: string) => Promise<any> }) => {
	const navigate = useNavigate();

	const signIn = async (provider: AuthProvider, formData: FormData, _callbackUrl?: string): Promise<AuthResponse> => {

		if (provider.id === 'credentials') {
			try {
				const email = formData.get('email') as string;
				const password = formData.get('password') as string;
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				console.log('User signed in:', userCredential);
				navigate('/admin-dashboard');
				return { user: userCredential.user };
			} catch (error: unknown) {
				if (error instanceof FirebaseError) {
					if (error.code === 'auth/invalid-credential') {
						return { error: 'Invalid email or password' };
					}
				}
				return { error: 'An unknown error occurred' };
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
