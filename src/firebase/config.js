import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const projectFirestore = getFirestore(app);

export default app
