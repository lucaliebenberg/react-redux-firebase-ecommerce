// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDoc, getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXTIDopI9-3fwp8ojJI7-uUUM5SRFgXmQ",
  authDomain: "react-redux-firebase-eco-72c9d.firebaseapp.com",
  projectId: "react-redux-firebase-eco-72c9d",
  storageBucket: "react-redux-firebase-eco-72c9d.appspot.com",
  messagingSenderId: "618817709295",
  appId: "1:618817709295:web:744c1c59e548f89bef671a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const firestore = db;

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  // const { uid } = userAuth;

  const userRef = doc(db, "users", userAuth.uid);
  console.log(userRef);
  const snapshot = await getDoc(userRef);
  // console.log(snapshot);

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    const userRoles = ["users"];

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData,
      });
    } catch (error) {
      // console.log(error);
    }
  }
  return userRef;
};

const provider = new GoogleAuthProvider();
export { auth, provider, db, app };
