import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAy49QW6GQx7EIvFy_q8ghQEkYMXKIRLiI",
  authDomain: "unirec-project.firebaseapp.com",
  projectId: "unirec-project",
  storageBucket: "unirec-project.appspot.com",
  messagingSenderId: "212185119630",
  appId: "1:212185119630:web:12b0850902387521ac82df"
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const projectFirestore = getFirestore(app);

export default app
