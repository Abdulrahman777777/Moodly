import { dateFormatter } from "./moods";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDatabase, push, ref } from "firebase/database";
import { MoodArr } from "@/components/_MAIN/Rating";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const moodOverright = async (
  email: string,
  emoji: string,
  index: number | null,
  alertState: boolean | null
) => {
  const date = dateFormatter();
  switch (alertState) {
    case true:
      setDoc(
        doc(db, `${email}/${date}`),
        {
          index,
          emoji,
          text: MoodArr[index as number].text,
          date: dateFormatter(),
        },
        { merge: true }
      );
      break;

    case false:
      break;
    default:
      break;
  }
};

export default moodOverright;
