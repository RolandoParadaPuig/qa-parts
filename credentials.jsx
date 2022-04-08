import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCEVNpOieWQm-ATU29dfSqub-iCvA3s0DU",
  authDomain: "qa-parts-testing.firebaseapp.com",
  projectId: "qa-parts-testing",
  storageBucket: "qa-parts-testing.appspot.com",
  messagingSenderId: "144591142159",
  appId: "1:144591142159:web:1c86432c9de7b34d8f127a",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
export default firebaseApp;
