import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ScrollingEmojis() {
  const [windowHieght, setWindowHieght] = useState(400);
  useEffect(() => {
    setWindowHieght(window.innerHeight);
  }, []);
  const Arr = [];
  for (let index = 0; index < 15; index++) {
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
