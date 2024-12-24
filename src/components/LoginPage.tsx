import { AuthProvider, SignInPage } from '@toolpad/core/SignInPage';

interface AuthResponse {
  user?: any;
  error?: string;
}
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const LoginPage = () => {
  const signIn = async (provider: AuthProvider, credentials: any): Promise<AuthResponse> => {
	if (provider.id === 'credentials') {
	  const auth = getAuth();
	  try {
		const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
		return { user: userCredential.user };
	  } catch (error) {
		return { error: (error as any).message };
	  }
	}
	return { error: 'Invalid provider' };
  };

  return (
      <SignInPage signIn={signIn} providers={providers} />
  );
};

export default LoginPage;
