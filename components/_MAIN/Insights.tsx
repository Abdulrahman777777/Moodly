import { FaArrowLeft } from "react-icons/fa";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import ScrollingEmojis from "../ScrollingEmojis";

const getJoke = async (
  determiner: Function,
  index: number,
  setJoke: Function,
  setDetermine: Function
) => {
  const rand = Math.random();
  if (rand <= 0.1) {
    const feData = await fetch(
      "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    ).catch((err) => getJoke(determiner, index, setJoke, setDetermine));
    if (feData) {
      const data = await feData
        .json()
        .catch((err) => getJoke(determiner, index, setJoke, setDetermine));
      if (data) {
        setJoke(data.joke);
      }
    }
  } else {
    const feData = await fetch(
      `https://api.api-ninjas.com/v1/jokes?X-Api-Key=${process.env.NEXT_PUBLIC_QUOTE_SUCCESS}`
    ).catch((err) => getJoke(determiner, index, setJoke, setDetermine));
    if (feData) {
      const data = await feData
        .json()
        .catch((err) => getJoke(determiner, index, setJoke, setDetermine));
      if (data) {
        setJoke(data[0].joke);
      }
    }
  }
  setDetermine(determiner(index));
};

const Insights = ({
  index,
  setInsight,
}: {
  index: number;
  setInsight: Function;
}) => {
  const [determine, setDetermine] = useState("");
  const [joke, setJoke] = useState("");
  const [scope, animate] = useAnimate();
  const determiner = (index: number): string => {
    // Check the range for the index
    if (index === 1 || index === 2 || index === 3) {
      // Generate a random number between 1 and 4
      const randomN = Math.floor(Math.random() * 4) + 1;

      // Determine the message based on the random number
      if (randomN === 1) {
        return "Why are you not smilin'?";
      } else if (randomN === 2) {
        return "Smile, you only have one life";
      } else if (randomN === 3) {
        return "Aw, you're so beautiful when you smile";
      } else if (randomN === 4) {
        return "Smile because life is beautiful";
      }
    } else if (index === 4 || index === 5 || index === 6 || index === 7) {
      // Generate a random number between 1 and 4
      const random = Math.floor(Math.random() * 4) + 1;

      // Determine the message based on the random number
      if (random === 1) {
        return "What's going on why you not smiling alot'?";
      } else if (random === 2) {
        return "A day without smiling is a day without hope";
      } else if (random === 3) {
        return "Hope is what makes you smile , so have hope.";
      } else if (random === 4) {
        return "Smile because life is beautiful";
      }
    } else if (index === 8 || index === 9 || index === 10) {
      // Generate a random number between 1 and 4
      const randomNo = Math.floor(Math.random() * 4) + 1;

      // Determine the message based on the random number
      if (randomNo === 1) {
        return "Happy that you're smilin' and vibin' 😁";
      } else if (randomNo === 2) {
        return "Keep smilin'😎";
      } else if (randomNo === 3) {
        return "Smilin' is the best part of the day 😊";
      } else if (randomNo === 4) {
        return "Smile because life is beautiful";
      }
    }

    // Default return value if no condition is met
    return "Smile because life is beautiful";
  };
  useEffect(() => {
    getJoke(determiner, index, setJoke, setDetermine);
  }, []);
  if (joke !== "") {
    return (
      <>
        <ScrollingEmojis />
        <section className="w-screen backdrop-blur-md sticky bg-opacity-15 z-50 min-h-screen flex mobile:justify-around flex-wrap items-center">
          <nav className="w-screen self-start flex justify-start items-center tablet:justify-center ">
            <motion.button
              onClick={() => setInsight(false)}
              onHoverStart={() => animate(scope.current, { x: -20 })}
              onHoverEnd={() => animate(scope.current, { x: 0 })}
              className=" p-4 bg-amber-500  rounded-lg hover:bg-amber-600 w-64 h-10 flex justify-end items-center"
            >
              <p ref={scope}>
                <FaArrowLeft />
              </p>
              Go back to dashboard
            </motion.button>
          </nav>
          <div className="ins w-screen flex justify-center items-center flex-col">
            <h1 className="text-2xl text-center">🗣️🗣️{determine}!</h1>
            <h3 className="text-1xl text-center">Next time, smile more.</h3>
          </div>
          <div className="body flex justify-evenly items-center flex-col w-screen h-1/2 gap-2">
            <h2 className="self-start pl-3 mobile:self-center text-amber-600 text-2xl">
              Here{"'"}s a joke for you.
            </h2>
            <p className="font-light text-center text-xl mb-10">{joke}</p>
            <button
              className="w-60 bg-amber-500 hover:bg-amber-600 rounded-xl h-16"
              onClick={async () => {
                setJoke("");
                getJoke(determiner, index, setJoke, setDetermine);
              }}
            >
              Get another Joke!
            </button>
          </div>
        </section>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default Insights;
