import React, { useState } from "react";
import Mood from "./Moods";
import ScrollingEmojis from "../ScrollingEmojis";
import Modal from "react-modal";
import moodOverright from "@/database/moodOverright";

export const MoodArr = [
  { emoji: "🔪", text: "Suicidal" },
  { emoji: "💔", text: "Hating life" },
  { emoji: "😭", text: "Depressed" },
  { emoji: "😔", text: "Upset" },
  { emoji: "☹️", text: "Sad" },
  { emoji: "😐", text: "Existing" },
  { emoji: "😎", text: "Happy" },
  { emoji: "🤗", text: "Great" },
  { emoji: "🥰", text: "Loving Life" },
  { emoji: "😊", text: "Scrumptios" },
];
function Rating({
  email,
  setMoodState,
}: {
  email: string;
  setMoodState: Function;
}) {
  const [alert, setAlert] = useState(false);
  const [alertState, setAlertState] = useState(null as boolean | null);
  const [emoji, setEmoji] = useState("");
  const [text, setText] = useState("");
  const [index, setIndex] = useState(null as number | null);

  return (
    <>
      <ScrollingEmojis delay={0} />
      <ScrollingEmojis delay={6} />
      <div className="alert-con flex justify-center bg-transparent absolute  items-center w-screen h-screen">
        <div
          className={`alert w-1/2 h-1/2 z-50 bg-white flex items-center  flex-col justify-around dark:bg-slate-900  ${
            !alert ? "opacity-0" : "ocpacity-100"
          }`}
        >
          <h3 className="mobile:w-2/3">
            You already gave your feelings for today...{" "}
            <p> Do you want to change it?</p>
          </h3>
          <div className=" w-full flex justify-end items-center gap-5">
            <button
              onClick={() => {
                setAlertState(false);
                setAlert(false);
                moodOverright(email, emoji, index, false);
                setMoodState("dashboard");
              }}
              className="w-2/12 bg-slate-800 hover:bg-slate-600 rounded-3xl text-center"
            >
              No
            </button>
            <button
              onClick={() => {
                setAlertState(true);
                setAlert(false);
                moodOverright(email, emoji, index, true);
                setMoodState("dashboard");
              }}
              className="mr-12 w-2/12 bg-slate-800 hover:bg-slate-600 rounded-3xl text-center"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col -z-20 bg-transparent  justify-around w-screen h-screen items-center overflow-scroll">
        <h1 className="text-5xl z-20 font-sans font-extralight tracking-widest">
          Rate your Mood..
        </h1>
        <div className="flex overflow-scroll items-center justify-center w-screen flex-wrap ">
          {MoodArr.map((mood, index) => (
            <Mood
              setMoodState={setMoodState}
              key={index}
              emoji={mood.emoji}
              index={index + 1}
              text={mood.text}
              email={email}
              setAlert={setAlert}
              alertState={alertState}
              setText={setText}
              setEmoji={setEmoji}
              setIndex={setIndex}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Rating;
