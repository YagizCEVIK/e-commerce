import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmf-JesPjdbgWRRVeZsiNwyB101HmLETo",
  authDomain: "e-commerce-d9d9a.firebaseapp.com",
  projectId: "e-commerce-d9d9a",
  storageBucket: "e-commerce-d9d9a.firebasestorage.app",
  messagingSenderId: "186457210735",
  appId: "1:186457210735:web:1e91c628fad9848dbc729a",
  measurementId: "G-XQCNNLT60G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
