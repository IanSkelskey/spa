import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

function uploadImage(file: File, path: string) {
    const storageRef = ref(storage, path);
    return uploadBytes(storageRef, file);
}

function getImageUrl(path: string): Promise<string> {
    const storageRef = ref(storage, path);
    return getDownloadURL(storageRef);
}

export { uploadImage, getImageUrl };