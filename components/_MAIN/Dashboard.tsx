import { fetchingMonths } from "@/database/fetchingMonth";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { useTransform } from "framer-motion";
import { MoodArr } from "./Rating";

function Dashboard({ email }: { email: string }) {
  const [data, setData] = useState({ IndArr: [], text: "", Emo: "" } as any);
  useEffect(() => {
    const fetch = async () => {
      const fetchedData = await fetchingMonths(email);
    };
    fetch();
  }, []);
  if (typeof data !== "string") {
    return (
      <section>
        <div className="cont h-screen w-screen flex flex-col justify-center items-center ">
          <h1 className="font-semibold text-3xl text-red-600 dark:text-red-">
            On Average You've been {data.text} for the last
            {data.IndArr.length > 1 ? ` ${data.IndArr.length} days` : " day"}.
          </h1>
          <h2 className="fixed -z-20 text-8xl">{data.Emo}</h2>
        </div>
      </section>
    );
  } else {
    return <Loading />;
  }
}

export default Dashboard;
