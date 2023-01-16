import { initializeApp } from "firebase/app";
import { collection, getFirestore, query } from "firebase/firestore";

import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "music-player-1d182.firebaseapp.com",
  projectId: "music-player-1d182",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);
export const collectionMusic = query(collection(db, "music"));
