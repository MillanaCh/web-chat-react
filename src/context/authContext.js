import { createContext, useContext, useState, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { ref, set } from "firebase/database";
// for use context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthContext = createContext({
  user: null,
  signInWithEmail: () => {},
  signInWithGmail: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  });

  const signInWithEmail = async ({ email, password }) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      realdbUser(response?.user);
    } catch (error) {
      alert(error?.message);
    }
  };

  const signInWithGmail = async () => {
    try {
      const provider = new GoogleAuthProvider();
      let response = await signInWithPopup(auth, provider);
      console.log(response?.user);
      realdbUser(response?.user);
    } catch (error) {
      alert(error?.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error?.message);
    }
  };

  //   Realtime Database PART

  const realdbUser = (userData) => {
    let data = {
      displayName: userData?.displayName,
      email: userData?.email,
      photoURL: userData?.photoURL,
    };
    set(ref(db, `users/${userData?.uid}`), data);
  };
  const info = useMemo(
    () => ({
      user: user,
      signInWithEmail: signInWithEmail,
      signInWithGmail: signInWithGmail,
      logOut: logOut,
    }),
    [user]
  );
  return (
    <AuthContext.Provider value={info}>
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};
