// Firebase Configuration for EthicScan
// Replace with your own Firebase project credentials
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDemo_ReplaceWithYourOwnKey",
  authDomain: "ethicscan-demo.firebaseapp.com",
  projectId: "ethicscan-demo",
  storageBucket: "ethicscan-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
