"use client";

import { motion } from "framer-motion";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import ScrollingEmojis from "@/components/ScrollingEmojis";
import { useState } from "react";
import AppUI from "../components/App";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

export default function Home() {
  const [authing, setAuthing] = useState(false);
  if (!authing) {
    return (
      <main className="-z-10 overflow-hidden w-screen h-screen">
        <ScrollingEmojis delay={0} />
        <ScrollingEmojis delay={5} />
        <div className="w-screen h-screen cont flex items-center justify-center z-20 bg-transparent absolute">
          <div className="text gap-8 h-screen flex flex-col justify-center items-middle">
            <h1 className="font-sans text-8xl text-center">Moodly!</h1>
            <h4 className="text-center text-4xl tracking-widest">
              Tracks your mood...
            </h4>
            <div className="button flex justify-center">
              <button
                type="button"
                className=" align-middle hover:bg-slate-400 hover:border-black hover:bg-opacity-65 bg-opacity-65 rounded-xl border-2 w-1/2 hover: border-transparent h-10 dark:hover:hover:bg-gray-900 dark:hover:border-gray-600"
                onClick={() => setAuthing(true)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    // return <LoginForm userId={userId} setUserID={setUserId} />;
    return <AppUI />;
  }
}
