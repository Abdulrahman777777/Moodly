import { fetchingMonths } from "@/database/fetchingMonth";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { motion, useAnimate } from "framer-motion";
import { MoodArr } from "./Rating";
import Charting from "../Chart";
import { FaArrowRight } from "react-icons/fa";
import Insights from "./Insights";
import ScrollingEmojis from "../ScrollingEmojis";

function Dashboard({ email }: { email: string }) {
  const [data, setData] = useState({ IndArr: [], text: "", Emo: "" } as any);
  const [insight, setInsight] = useState(false);
  const [scope, animate] = useAnimate();
  useEffect(() => {
    const fetch = async () => {
      const fetchedData = await fetchingMonths(email);
      setData(fetchedData);
    };
    fetch();
  }, []);
  if (
    typeof data !== "string" &&
    insight == false &&
    data.avgInd !== undefined
  ) {
    return (
      <>
        <ScrollingEmojis />
        <section className="flex backdrop-blur-md bg-opacity-15 sticky flex-wrap justify-around w-screen min-h-screen items-center z-50">
          <div className="text flex justify-center flex-col items-center gap-2 mobile:mt-4">
            <h1 className="text-2xl text-center mobile:p-3">
              On average you{"'"}ve been{" "}
              <text className="text-amber-500 font-bold">{data.text}</text> for
              the last
              <text className="text-amber-500 font-bold text-center">
                {data.IndArr.length > 1
                  ? ` ${data.IndArr.length} days`
                  : " day"}
              </text>
            </h1>
            <h2 className="mb-4 text-center">
              You{"'"}re average rating is{" "}
              <text className="text-amber-500 font-bold">{`0${
                data.avgInd + 1
              }/10`}</text>
            </h2>
            <motion.button
              onClick={() => setInsight(true)}
              onHoverStart={() => animate(scope.current, { x: 20 })}
              onHoverEnd={() => animate(scope.current, { x: 0 })}
              className="button mobile:mb-3 bg-amber-500 rounded-lg hover:bg-amber-600 w-56 h-10 flex justify-evenly items-center"
            >
              Insights{" "}
              <p ref={scope}>
                <FaArrowRight />
              </p>
            </motion.button>
          </div>
          <Charting IndArr={data.IndArr} per={data.per} />
        </section>
      </>
    );
  } else if (insight == true) {
    return <Insights index={data.IndArr.length} setInsight={setInsight} />;
  } else {
    return <Loading />;
  }
}

export default Dashboard;
