import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import {
  auth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "../FirebaseConnect";


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const login = async(email, password)=> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Success !!");
      return 
    } catch (error) {
      console.log("Fail !!" ,error.message);
      throw error;
      
    }
  }

  const logout = async ()=> {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth  , (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, login, logout };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
}