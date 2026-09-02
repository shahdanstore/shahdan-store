import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJC0709FSSHCcgz_p58tYv73Jp5QCxCr0",
  authDomain: "shahdan-store.firebaseapp.com",
  projectId: "shahdan-store",
  storageBucket: "shahdan-store.firebasestorage.app",
  messagingSenderId: "923272586123",
  appId: "1:923272586123:web:fc1788594e5601af4f458e",
  measurementId: "G-HTRR8261PR",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const analytics = getAnalytics(app);

export default app;
