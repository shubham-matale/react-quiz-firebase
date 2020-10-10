import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBH_IlOWf_9iz8u1gbA7FwOOvQ3Kkui_7Y",
    authDomain: "react-quiz-app-72266.firebaseapp.com",
    databaseURL: "https://react-quiz-app-72266.firebaseio.com",
    projectId: "react-quiz-app-72266",
    storageBucket: "react-quiz-app-72266.appspot.com",
    messagingSenderId: "348743559747",
    appId: "1:348743559747:web:84006fe7d76402f26842f6",
    measurementId: "G-6868HMLF6M"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        role:"normalUser",
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};