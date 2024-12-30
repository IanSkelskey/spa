import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import User from "../models/User";

export async function getUserByEmail(email: string) {
	try {
		const userDoc = await getDoc(doc(collection(db, "users"), email));
		if (userDoc.exists()) {
			return userDoc.data();
		} else {
			throw new Error("User not found");
		}
	} catch (error) {
		console.error("Error getting user:", error);
		throw error;
	}
}

export async function getUserRole(email: string) {
	try {
		const user = await getUserByEmail(email);
		return user.role;
	} catch (error) {
		console.error("Error getting user role:", error);
		throw error;
	}
}

export async function getUsersByRole(role: string): Promise<User[]> {
	try {
		const users: User[] = [];
		const q = query(collection(db, "users"), where("role", "==", role));
		const usersSnapshot = await getDocs(q);
		usersSnapshot.forEach((doc) => {
			users.push(doc.data() as User);
		});
		return users;
	} catch (error) {
		console.error("Error getting users by role:", error);
		throw error;
	}
}

export async function createUser(user: User) {
	const response = await fetch(`https://us-central1-the-spa-84a52.cloudfunctions.net/createUser`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response; // Return response for further processing
}