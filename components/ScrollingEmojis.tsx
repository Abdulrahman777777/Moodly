import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ScrollingEmojis() {
  const [windowHieght, setWindowHieght] = useState(400);
  useEffect(() => {
    setWindowHieght(window.innerHeight);
  }, []);
  const Arr = [
    "😊", // Smiling face with smiling eyes
    "😂", // Face with tears of joy
    "😢", // Crying face
    "😠", // Angry face
    "😍", // Heart eyes
    "😱", // Face screaming in fear
    "😎", // Smiling face with sunglasses
    "🤔", // Thinking face
    "😴", // Sleeping face
    "😲", // Astonished face
    "😅", // Smiling face with sweat
    "😡", // Pouting face
    "😜", // Face with stuck-out tongue and winking eye
    "😇", // Smiling face with halo
    "🤯", // Exploding head
    "😈", // Smiling face with horns
    "🥺", // Pleading face
    "🤗", // Hugging face
    "😩", // Weary face
    "😤", // Face with steam from nose
    "🤤", // Drooling face
    "😶", // Face without mouth
    "🥳", // Partying face
    "😮", // Face with open mouth
    "😑", // Expressionless face
    "🥵", // Hot face
    "🥶", // Cold face
    "😰", // Anxious face with sweat
    "🤥", // Lying face
    "🤫", // Shushing face
    "🙄", // Face with rolling eyes
  ];
  return (
    <motion.div className=" flex fixed justify-center items-center overflow-hidden  -z-50 w-screen text-center h-screen">
      {Arr.map((mood, index) => {
        return (
          <motion.h3
            initial={{ y: (windowHieght / 2) * -1 - index - 40 }}
            animate={{
              y: [
                (windowHieght / 2) * -1 - index - 40,
                (windowHieght / 2) * +1 +
                  Math.abs(+Math.random() * 100 - 120 + 40),
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeIn",
              delay: +1 * Math.random() + Math.random() * 10,
            }}
            key={index}
            className="text-3xl pointer-events-none "
          >
            {mood}
          </motion.h3>
        );
      })}
    </motion.div>
  );
}

export default ScrollingEmojis;
