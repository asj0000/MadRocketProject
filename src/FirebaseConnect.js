import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut ,
    onAuthStateChanged
} from "firebase/auth"; 
import { getFirestore ,collection , addDoc , getDoc ,doc , getDocs ,onSnapshot ,updateDoc,setDoc,deleteDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBruKagUAlTMijrGqx7FQgUXl4WXB-9AVA",
    authDomain: "madrocketproject.firebaseapp.com",
    projectId: "madrocketproject",
    storageBucket: "madrocketproject.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut ,db ,collection , addDoc , getDoc , getDocs , doc ,onSnapshot,updateDoc,setDoc,deleteDoc};