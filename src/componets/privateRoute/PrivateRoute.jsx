import { Navigate } from "react-router-dom";
import { AuthLoader } from "../authLoader/AuthLoader";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
const auth = getAuth();
const db = getFirestore();
export const PrivateRoute = ({ children }) => {
  const [globalUser, setGlobalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  onAuthStateChanged(getAuth(), async (fireBaseUser) => {
    if (fireBaseUser) {
      const uid = fireBaseUser.uid;
      setGlobalUser(uid);
      const UserRef = collection(db, "Users");
      const q = query(
        UserRef,
        where("email", "==", `${auth.currentUser.email}`)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs[0] != null) {
        const _path =
          querySnapshot.docs[0]._document.data.value.mapValue.fields;
        const name = _path.name.stringValue;
        auth.currentUser.displayName = name;
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  });
  if (loading) {
    return <AuthLoader />;
  }
  return auth.currentUser ? children : <Navigate to="/login" />;
};
