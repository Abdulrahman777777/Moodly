import moods from "@/database/moods";
import React from "react";

const Mood = ({
  setMoodState,
  text,
  emoji,
  index,
  email,
  setAlert,
  alertState,
  setText,
  setEmoji,
  key,
  setIndex,
}: {
  setMoodState: Function;
  key: number;
  index: number;
  text: string;
  emoji: string;
  email: string;
  setAlert: Function;
  alertState: boolean | null;
  setText: Function;
  setEmoji: Function;
  setIndex: Function;
}) => {
  let i = "0";
  if (index < 10) {
    i = `0${index}`;
  } else {
    i = `${index}`;
  }
  return (
    <div
      onClick={() => {
        moods(email, emoji, index, setAlert, text, setMoodState);
        setEmoji(emoji);
        setText(text);
        setIndex(index);
      }}
      className="z-20 w-64 hover:backdrop-blur-sm mobile:w-screen h-36 flex flex-col justify-center items-center  align-middle hover:bg-slate-400 hover:border-black hover:bg-opacity-15 rounded-xl border-2  hover: border-transparent   cursor-pointer"
    >
      <h3 className="text-8xl text-slate-500 dark:text-slate-800">{i}</h3>
      <h1>{text}</h1>
      <h1 className="text-2xl relative -top-2">{emoji}</h1>
    </div>
  );
};

export default Mood;
