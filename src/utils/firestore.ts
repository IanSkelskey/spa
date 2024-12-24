import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

interface User {
	role: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const userDoc = doc(db, "users", email);
	const userSnapshot = await getDoc(userDoc);

	if (userSnapshot.exists()) {
		return userSnapshot.data() as User;
	} else {
		return null;
	}
}