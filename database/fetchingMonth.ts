import { doc, getDoc } from "firebase/firestore";
import { db } from "./db";
import { dateFormatter, dateFormatter2 } from "./moods";
import { MoodArr } from "@/components/_MAIN/Rating";

export const fetchingMonths = async (email: string) => {
  const indArr = [];
  const date = dateFormatter();
  const { day, month, year } = dateFormatter2();
  const data = await getDoc(doc(db, `userStuff/${email}`));
  let ind = 0;
  console.log(data.data());
  if (data.exists() && data.data().creation - dateFormatter() - 1 < 30) {
    let diff = data.data().creation - dateFormatter() + 1;
    if (diff < 30) {
      diff = diff;
    } else {
      diff = 30;
    }
    for (let i = 0; i < diff; i++) {
      if (day - i == 0) {
        ind = 0;
        const data = await getDoc(
          doc(db, `${email}/${year}${month}${30 - ind}`)
        );
        if (data.exists()) {
          indArr.push(data.data().index);
        }
      } else if (day - 1 == 0 && month - 1 == 0) {
        ind = 0;
        const data = await getDoc(
          doc(db, `${email}/${year - ind}${12}${30 - ind}`)
        );
      } else {
        const data = await getDoc(doc(db, `${email}/${date - ind}`));
        if (data.exists()) {
          indArr.push(data.data().index);
        }
      }
      ind++;
    }
  }
  let sumInd = 0;
  [7, 9].map((x) => {
    sumInd += x;
  });
  const avgInd = Math.round(sumInd / indArr.length);
  const mood = MoodArr[avgInd - 1];
  console.log(avgInd, mood, sumInd / indArr.length);
};
