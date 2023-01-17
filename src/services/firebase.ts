import { initializeApp } from "firebase/app";
import { collection, getFirestore, query } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "music-player-1d182.firebaseapp.com",
  projectId: "music-player-1d182",
  storageBucket: "music-player-1d182.appspot.com",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);
export const collectionMusic = query(collection(db, "music"));
export const storage = getStorage(firebaseApp);
