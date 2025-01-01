import { useState, useEffect } from 'react';
import {
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    User as FirebaseUser,
} from 'firebase/auth';
import { app } from './firebaseConfig';
import { useNotifications } from '@toolpad/core';
import { getUserByEmail } from './firestore';
import User from '../models/User';

const auth = getAuth(app);

export function useAuth() {
    const [user, setUser] = useState<User | null>(() => {
        const cachedUser = localStorage.getItem('user');
        return cachedUser ? JSON.parse(cachedUser) : null;
    });
    const notifications = useNotifications();

    const logout = () => {
        auth.signOut()
            .then(() => {
                setUser(null);
                localStorage.removeItem('user');
                notifications.show('Successfully logged out!', {
                    severity: 'success',
                    autoHideDuration: 3000,
                });
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
                notifications.show('Error signing out!', {
                    severity: 'error',
                    autoHideDuration: 3000,
                });
            });
    };

    const login = async (
        email: string,
        password: string
    ): Promise<{ user?: User; error?: string }> => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const loggedInUser = await getUserByEmail(userCredential.user.email);
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            notifications.show('Welcome back!', {
                severity: 'success',
                autoHideDuration: 3000,
            });
            return { user: loggedInUser };
        } catch (error: unknown) {
            if (error instanceof Error) {
                const errorMessage = error.message.includes(
                    'auth/invalid-credential'
                )
                    ? 'Invalid email or password'
                    : `An unknown error occurred: ${error.message}`;
                notifications.show(errorMessage, {
                    severity: 'error',
                    autoHideDuration: 3000,
                });
                return { error: errorMessage };
            }
            notifications.show('An unknown error occurred', {
                severity: 'error',
                autoHideDuration: 3000,
            });
            return { error: 'An unknown error occurred' };
        }
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
        notifications.show('Password reset email sent!', {
            severity: 'success',
            autoHideDuration: 3000,
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const user = await getUserByEmail(firebaseUser.email);
                    setUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        });

        return () => unsubscribe();
    }, []);

    return { user, login, logout, resetPassword };
}