import { useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import LoginPage from "../components/LoginPage";
import app from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

interface AuthWrapperProps {
	children: ReactNode;
}

export function useAuth() {
	const [user, setUser] = useState<User | null>(null);

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

	const AuthWrapper = ({ children }: AuthWrapperProps) => {
		if (!user) {
			return (
				<LoginPage
					auth={auth}
					signInWithEmailAndPassword={signInWithEmailAndPassword}
					onLogin={(user: User) => setUser(user)}
				/>
			);
		}

		console.log("User is logged in", user);

		return <>{children}</>;
	};

	return { user, AuthWrapper };
}