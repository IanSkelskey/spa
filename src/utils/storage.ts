import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebaseConfig';

function uploadImage(file: File, path: string) {
	const storageRef = ref(storage, path);
	return uploadBytes(storageRef, file);
}

export { uploadImage };