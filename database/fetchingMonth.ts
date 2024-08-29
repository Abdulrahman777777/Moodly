import { doc, getDoc } from "firebase/firestore";
import { db } from "./db";
import { dateFormatter, dateFormatter2 } from "./moods";
import { MoodArr } from "@/components/_MAIN/Rating";
import { cookies } from "next/headers";

export const fetchingMonths = async (email: string) => {
  const indArr = [];
  const Arr = [];
  const date = dateFormatter();
  const { day, month, year } = dateFormatter2();
  const data = await getDoc(doc(db, `userStuff/${email}`));
  let ind = 0;
  if (data.exists() && data.data().creation - dateFormatter() - 1 < 30) {
    let diff = dateFormatter() - data.data().creation + 1;
    if (diff < 30) {
      diff = diff;
    } else {
      diff = 30;
    }
    for (let i = 0; i < diff; i++) {
      if (day - 1 == 0) {
        ind = 0;
        const data = await getDoc(
          doc(db, `${email}/${year}${month}${30 - ind}`)
        );
        if (data.exists()) {
          indArr.push(data.data().index);
          Arr.push(data.data());
        }
      } else if (day - 1 == 0 && month - 1 == 0) {
        ind = 0;
        const data = await getDoc(
          doc(db, `${email}/${year - ind}${12}${30 - ind}`)
        );
        if (data.exists()) {
          indArr.push(data.data().index);
          Arr.push(data.data());
        }
      } else {
        const data = await getDoc(doc(db, `${email}/${date - ind}`));
        if (data.exists()) {
          indArr.push(data.data().index);
          Arr.push(data.data());
        }
      }
      ind++;
    }
  }
  let sumInd = 0;
  indArr.map((x) => {
    sumInd += x;
  });
  const avgInd = Math.round(sumInd / indArr.length);
  const mood = MoodArr[avgInd - 1];
  const per = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  indArr.map((x) => {
    per[x]++;
  });
  return { text: mood.text, Emo: mood.emoji, avgInd, IndArr: indArr, Arr, per };
};
