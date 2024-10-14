import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_YjEl6eDxTLBlVxIwFwiZeYXocMKqPvs",
  authDomain: "socioverse-a50bc.firebaseapp.com",
  projectId: "socioverse-a50bc",
  storageBucket: "socioverse-a50bc.appspot.com",
  messagingSenderId: "486340373940",
  appId: "1:486340373940:web:dbf98df1541b59370f96e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
