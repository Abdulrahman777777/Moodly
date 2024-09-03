"use client";

import React, { useRef, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { userAddition } from "@/database/db";
import { v4 } from "uuid";
import { initializeApp } from "firebase/app";
import { FaGoogle } from "react-icons/fa";
import { useAnimate, motion } from "framer-motion";
import ScrollingEmojis from "./ScrollingEmojis";

const provider = new GoogleAuthProvider();
interface LoginFormProps {
  setEmail: Function;
  setAuthed: Function;
}

// Define Firebase configuration
interface FirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
}

// Initialize Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function LoginForm({ setEmail, setAuthed }: LoginFormProps) {
  const [scope, animate] = useAnimate();
  const emailInput = useRef(null as any);
  const passwordInput = useRef(null as any);
  const nameInput = useRef(null as any);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const [checkBox, setCheckBox] = useState("password");
  return (
    <>
      <ScrollingEmojis />
      <div className="w-screen h-screen bg-opacity-15 z-50  flex gap-36 justify-around items-center flex-col ">
        <div className="email w-screen gap-5 h-1/2 flex justify-around items-center flex-col">
          <div className="email">
            <h3>Name:</h3>
            <input
              className=" placeholder:text-white bg-amber-500 dark:bg-amber-600 text-white border-2 rounded-lg text-center "
              ref={nameInput}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="email">
            <h3>Email:</h3>
            <input
              className=" placeholder:text-white bg-amber-500 dark:bg-amber-600 text-white border-2 rounded-lg text-center "
              ref={emailInput}
              type="text"
              placeholder="example@example.com"
            />
          </div>
          <div className="password">
            <h3>Password:</h3>
            <input
              ref={passwordInput}
              className="placeholder:text-white bg-amber-500 dark:bg-amber-600 text-white border-2 rounded-lg text-center "
              type={checkBox}
              placeholder="password"
            />
            <div className="showpass pt-4 flex justify-between items-center">
              <h3>Show Password</h3>
              <input
                onClick={() => {
                  if (checkBox == "password") {
                    setCheckBox("text");
                  } else {
                    setCheckBox("password");
                  }
                }}
                type="checkbox"
                name="checkBox"
                id="check"
              />
            </div>
          </div>
          <div className="submit w-screen flex justify-center items-center ">
            <button
              className="w-56 bg-amber-400 dark:bg-amber-500 text-white rounded-lg  "
              onClick={async () => {
                if (!validateEmail(emailInput.current.value)) {
                  alert("Please enter a valid email");
                } else {
                  const password = passwordInput.current.value;
                  const email = emailInput.current.value;
                  const name = nameInput.current.value;
                  const id = v4();
                  setEmail(email);
                  setAuthed(true);
                  userAddition(id, email, password, Date.now(), name);
                }
              }}
            >
              Sign in
            </button>
          </div>
          <motion.button
            onHoverStart={() => {
              animate(scope.current, { rotate: 180 });
            }}
            onHoverEnd={() => {
              animate(scope.current, { rotate: 0 });
            }}
            className=" flex justify-around items-center bg-amber-400 dark:bg-amber-500 text-white w-56 p-4 rounded-xl "
            onClick={async () => {
              await animate(
                scope.current,
                { rotate: [-90, 90, -180, 180, -360, 360] },
                { duration: 2 }
              );
              const result = await signInWithPopup(auth, provider);
              setEmail(result.user.email);
              setAuthed(true);
              userAddition(
                result.user.uid,
                result.user.email as string,
                result.user.displayName as string,
                Date.now(),
                result.user.displayName as string
              );
            }}
          >
            {" "}
            <text ref={scope}>
              <FaGoogle size={40} />
            </text>
            Sign in with Google{" "}
          </motion.button>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
