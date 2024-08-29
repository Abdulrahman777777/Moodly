// components\LoginForm.tsx
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

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginForm = ({
  setEmail,
  setAuthed,
}: {
  setEmail: Function;
  setAuthed: Function;
}) => {
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [checkBox, setCheckBox] = useState("password");
  const [error, setError] = useState("");
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const scope = useRef<HTMLDivElement>(null);

  const animate = useAnimate();

  const handleSignIn = () => {
    if (!validateEmail(emailInput.current?.value ?? "")) {
      setError("Please enter a valid email");
    } else {
      const password = passwordInput.current?.value ?? "";
      const email = emailInput.current?.value ?? "";
      const name = nameInput.current?.value ?? "";
      const id = v4();
      if (email) {
        setEmail(email);
        setAuthed(true);
        userAddition(id, email, password, Date.now(), name);
      } else {
        // Handle the case where email is undefined
        setError("Email is required");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2">
        <h1 className="text-5xl">Sign In</h1>
        <div className="email">
          <h3>Email:</h3>
          <input
            ref={emailInput}
            className="placeholder:text-white bg-amber-500 dark:bg-amber-600 text-white border-2 rounded-lg text-center "
            type="email"
            placeholder="email"
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
        <div className="name">
          <h3>Name:</h3>
          <input
            ref={nameInput}
            className="placeholder:text-white bg-amber-500 dark:bg-amber-600 text-white border-2 rounded-lg text-center "
            type="text"
            placeholder="name"
          />
        </div>
        <div className="submit w-screen flex justify-center items-center ">
          <button
            className="w-56 bg-amber-400 dark:bg-amber-500 text-white rounded-lg  "
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
