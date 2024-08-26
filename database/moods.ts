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
export const dateFormatter = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = (today.getMonth() + 1) as any; // Months start at 0!
  let dd = today.getDate() as any;

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = yyyy + mm + dd;
  return Number(formattedToday);
};

export const dateFormatter2 = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = (today.getMonth() + 1) as any; // Months start at 0!
  let dd = today.getDate() as any; // Months start at 0!
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return { year: Number(yyyy), month: Number(mm), day: Number(dd) };
};

const database = getDatabase();

async function moods(
  email: string,
  emoji: string,
  index: number,
  setAlert: Function,
  text: string,
  setMoodState: Function
) {
  const date = dateFormatter();
  const dir = await getDoc(doc(db, `${email + "/" + date}`)).then((data) => {
    if (data.exists()) {
      setAlert(true);
    } else {
      setDoc(
        doc(db, `${email + "/" + date}`),
        {
          index: index,
          emoji,
          text,
          date: dateFormatter(),
        },

        { merge: true }
      );
      setMoodState("dashboard");
    }
  });
}

export default moods;
