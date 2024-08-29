// src/Charting.tsx

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MoodArr } from "./_MAIN/Rating";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          const label = context.label || "";
          const value = context.raw;
          const total = context.dataset.data.reduce(
            (acc: number, curr: number) => acc + curr,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2);
          return `${label}: ${percentage}%`;
        },
      },
    },
  },
};

const Charting = ({ per, IndArr }: { per: number[]; IndArr: number[] }) => {
  const data = {
    labels: MoodArr.map((x) => x.text),
    datasets: [
      {
        label: "Mood Chart",
        data: per,
        backgroundColor: [
          "rgba(255, 0, 0, 1)", // Bright red
          "#9a1700", // Darker red
          "#aa5428", // Reddish orange
          "rgba(160, 96, 0, 1)", // Orange
          "rgba(128, 128, 0, 1)", // Olive green
          "rgba(96, 160, 0, 1)", // Yellow-green
          "#00ff99", // Light green
          "#72e3ff", // Bright green
          "#000cae", // Even brighter green
          "#ffff00", // Fully green
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)", // Bright red
          "#9a1700", // Darker red
          "#aa5428", // Reddish orange
          "rgba(160, 96, 0, 1)", // Orange
          "rgba(128, 128, 0, 1)", // Olive green
          "rgba(96, 160, 0, 1)", // Yellow-green
          "#00ff99", // Light green
          "#72e3ff", // Bright green
          "#000cae", // Even brighter green
          "#ffff00", // Fully green
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-1/3 h-screen mobile:w-screen flex justify-center flex-col gap-1 items-center">
      <h1>
        Your mood chart for the last{" "}
        {IndArr.length == 1 ? "day" : `${IndArr.length} days`}
      </h1>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Charting;
