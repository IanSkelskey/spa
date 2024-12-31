import {
    collection,
    doc,
    getDoc,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import User from '../models/User';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';

export async function getUserByEmail(email: string): Promise<User> {
    try {
        const userDoc = await getDoc(doc(collection(db, 'users'), email));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return { ...userData, email } as User;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

export async function getUserRole(email: string) {
    try {
        const user = await getUserByEmail(email);
        return user.role;
    } catch (error) {
        console.error('Error getting user role:', error);
        throw error;
    }
}

export async function getUsersByRole(role: string): Promise<User[]> {
    try {
        const users: User[] = [];
        const q = query(collection(db, 'users'), where('role', '==', role));
        const usersSnapshot = await getDocs(q);
        usersSnapshot.forEach((doc) => {
            const userData = doc.data();
            users.push({ ...userData, email: doc.id } as User);
        });
        return users;
    } catch (error) {
        console.error('Error getting users by role:', error);
        throw error;
    }
}

export async function createUser(user: User): Promise<User> {
    const response = await fetch(
        `https://us-central1-the-spa-84a52.cloudfunctions.net/createUser`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    // Send password reset email after user creation
    const auth = getAuth();
    await sendPasswordResetEmail(auth, user.email);

    return user; // Return user for further processing
}

export async function deleteUser(email: string) {
    const response = await fetch(
        `https://us-central1-the-spa-84a52.cloudfunctions.net/deleteUser`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response; // Return response for further processing
}
