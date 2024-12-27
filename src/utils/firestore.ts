import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import User from "../models/User";

const db = getFirestore();

export async function getUserByEmail(email: string): Promise<User | null> {
	const userDoc = doc(db, "users", email);
	const userSnapshot = await getDoc(userDoc);

	if (userSnapshot.exists()) {
		return userSnapshot.data() as User;
	} else {
		return null;
	}
}

export async function getUserRole(email: string): Promise<string | null> {
	const user = await getUserByEmail(email);
	return user?.role ?? null;
}

export async function createUser(firstName: string, lastName: string, email: string, role: string): Promise<void> {
	const auth = getAuth();

	const userDoc = doc(db, "users", email);
	await setDoc(userDoc, { firstName, lastName, role });

	try {
		await createUserWithEmailAndPassword(auth, email, "temporaryPassword");
		await sendPasswordResetEmail(auth, email);
	} catch (error) {
		console.error("Error creating user:", error);
		
	}
}

export async function getUsersByRole(role: string): Promise<User[]> {
	const usersCollection = collection(db, "users");
	const q = query(usersCollection, where("role", "==", role));
	const querySnapshot = await getDocs(q);

	const users: User[] = [];
	querySnapshot.forEach((doc) => {
		users.push(doc.data() as User);
	});

	return users;
}