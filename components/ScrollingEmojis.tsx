import React, { useState } from "react";
import { motion } from "framer-motion";

const RandomX = () => {
  const Random = (Math.random() + Math.random()) / 2;
  return ((Random - 0) * (1280 - 0)) / (1 - 0);
};
const RandomY = () => {
  const Random = Math.random();
  return ((Random - 0) * (window.innerHeight - 0)) / (1 - 0);
};

function ScrollingEmojis({ delay }: { delay: number }) {
  const Arr = [];
  for (let index = 0; index < 25; index++) {
    const Random = Math.random();
    if (Random < 0.05) {
      Arr.push("😁");
    } else if (Random >= 0.05 && Random < 0.1) {
      Arr.push("😔");
    } else if (Random >= 0.1 && Random < 0.15) {
      Arr.push("😢");
    } else if (Random >= 0.15 && Random < 0.2) {
      Arr.push("😐");
    } else if (Random >= 0.2 && Random < 0.25) {
      Arr.push("😕");
    } else if (Random >= 0.25 && Random < 0.3) {
      Arr.push("☹️");
    } else if (Random >= 0.3 && Random < 0.35) {
      Arr.push("😂");
    } else if (Random >= 0.35 && Random < 0.4) {
      Arr.push("😠");
    } else if (Random >= 0.4 && Random < 0.45) {
      Arr.push("😡");
    } else if (Random >= 0.45 && Random < 0.5) {
      Arr.push("🤬");
    } else if (Random >= 0.5 && Random < 0.55) {
      Arr.push("😎");
    } else if (Random >= 0.55 && Random < 0.6) {
      Arr.push("😱");
    } else if (Random >= 0.6 && Random < 0.65) {
      Arr.push("🥹");
    } else if (Random >= 0.65 && Random < 0.7) {
      Arr.push("💔");
    } else if (Random >= 0.7 && Random < 0.75) {
      Arr.push("🥰");
    } else if (Random >= 0.75 && Random < 0.8) {
      Arr.push("😐");
    } else if (Random >= 0.8 && Random < 0.85) {
      Arr.push("🤒");
    } else if (Random >= 0.85 && Random < 0.9) {
      Arr.push("🤧");
    } else if (Random >= 0.9 && Random < 0.95) {
      Arr.push("😎");
    } else if (Random >= 0.95 && Random <= 1) {
      Arr.push("🥹");
    }
  }
  return (
    <motion.div className=" right-1/2 emojis absolute z-10 w-screen  text-center h-screen">
      {Arr.map((mood, index) => {
        let x = RandomX();
        let y = RandomY();
        return (
          <motion.h3
            key={index}
            initial={{ x: x * 2, y: y }}
            animate={{
              y: [(-window.innerHeight * 10 * index) / 10 - 100, y + 550],
            }}
            transition={{
              duration: 10 + index * 0.05,
              repeat: Infinity,
              ease: "circOut",
              delay: delay,
            }}
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
