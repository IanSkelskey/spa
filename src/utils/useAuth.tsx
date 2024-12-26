import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);

	const logout = () => {
		auth.signOut().then(() => {
			setUser(null);
		}).catch((error) => {
			console.error("Error signing out: ", error);
		});
	};

	const login = async (email: string, password: string): Promise<{ user?: User; error?: string }> => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			setUser(userCredential.user);
			return { user: userCredential.user };
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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	return { user, login, logout };
}