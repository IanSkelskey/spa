import { AuthProvider, SignInPage } from '@toolpad/core/SignInPage';
import { FirebaseError } from 'firebase/app';

interface AuthResponse {
	user?: any;
	error?: string;
}

const providers = [{ id: 'credentials', name: 'Email and Password' }];

import { Auth } from 'firebase/auth';

const LoginPage = ({ auth, signInWithEmailAndPassword, onLogin }: { auth: Auth, signInWithEmailAndPassword: (auth: Auth, email: string, password: string) => Promise<any>, onLogin: (user: any) => void }) => {

	const signIn = async (_provider: AuthProvider, formData: FormData, _callbackUrl?: string): Promise<AuthResponse> => {
		try {
			const email = formData.get('email') as string;
			const password = formData.get('password') as string;
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			console.log('User signed in:', userCredential);
			onLogin(userCredential.user);
			return { user: userCredential.user };
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				if (error.code === 'auth/invalid-credential') {
					return { error: 'Invalid email or password' };
				}
			}
			return { error: 'An unknown error occurred' };
		}
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
