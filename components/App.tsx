"use client";

import React from "react";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import Rating from "./_MAIN/Rating";
import Dashboard from "./_MAIN/Dashboard";

function AppUI() {
  const [email, setEmail] = useState("");
  const [authed, setAuthed] = useState(false);
  const [moodState, setMoodState] = useState("");
  if (!authed) {
    return <LoginForm setAuthed={setAuthed} setEmail={setEmail} />;
  } else if (authed && moodState !== "dashboard") {
    // return <Rating className="overflow-scroll" email={email} />;
    return <Rating email={email} setMoodState={setMoodState} />;
  } else if (moodState == "dashboard" && authed) {
    return <Dashboard email={email} />;
  }
}

export default AppUI;
