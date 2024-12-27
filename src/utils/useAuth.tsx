import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNotifications } from "@toolpad/core";

const auth = getAuth(app);

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const notifications = useNotifications(); // Hook for notifications

	const logout = () => {
		auth
			.signOut()
			.then(() => {
				setUser(null);
				notifications.show("Successfully logged out!", { severity: "success", autoHideDuration: 3000 });
			})
			.catch((error) => {
				console.error("Error signing out: ", error);
				notifications.show("Error signing out!", { severity: "error", autoHideDuration: 3000 });
			});
	};

	const login = async (email: string, password: string): Promise<{ user?: User; error?: string }> => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			setUser(userCredential.user);
			notifications.show("Welcome back!", { severity: "success", autoHideDuration: 3000 });
			return { user: userCredential.user };
		} catch (error: unknown) {
			if (error instanceof Error) {
				const errorMessage = error.message.includes("auth/invalid-credential")
					? "Invalid email or password"
					: `An unknown error occurred: ${error.message}`;
				notifications.show(errorMessage, { severity: "error", autoHideDuration: 3000 });
				return { error: errorMessage };
			}
			notifications.show("An unknown error occurred", { severity: "error", autoHideDuration: 3000 });
			return { error: "An unknown error occurred" };
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