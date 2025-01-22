// GraphFive.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./GraphFive.css";

Chart.register(ChartDataLabels);

interface ECGData {
  ecgDate: string;
  ecgDescription: string;
  gender: string; // Add gender to the data
}

interface GraphFiveProps {
  ecgData: ECGData[];
}

const redConditions = [
  "Брадиаритмии",
  "Синдром слабости синусового узла (остановка синусового узла)",
  "AV-блокада 2-й степени типа Мобитц",
  "Полная AV-блокада",
  "Тахиаритмии",
  "Пароксизмальная желудочковая тахикардия",
  "ЖТ типа «пируэт» torsades de pointes",
  "Желудочковые экстрасистолы (плитопные ЖЭС, ранние ЖЭС по типу R на Т)",
  "Синдром бругада",
  "Long QT",
];

const yellowConditions = [
  "Синусовая брадикардия",
  "Синусовая тахикардия",
  // ... (remaining yellow conditions)
];

const GraphFive: React.FC<GraphFiveProps> = ({ ecgData }) => {
  const redConditionsLower = redConditions.map((c) => c.toLowerCase());
  const yellowConditionsLower = yellowConditions.map((c) => c.toLowerCase());

  let menWithArrhythmia = 0;
  let womenWithArrhythmia = 0;
  let menWithoutArrhythmia = 0;
  let womenWithoutArrhythmia = 0;

  ecgData.forEach((record) => {
    const descLower = record.ecgDescription.toLowerCase();
    const isArrhythmia =
      redConditionsLower.some((c) => descLower.includes(c)) ||
      yellowConditionsLower.some((c) => descLower.includes(c));

    if (record.gender === "male") {
      if (isArrhythmia) {
        menWithArrhythmia++;
      } else {
        menWithoutArrhythmia++;
      }
    } else if (record.gender === "female") {
      if (isArrhythmia) {
        womenWithArrhythmia++;
      } else {
        womenWithoutArrhythmia++;
      }
    }
  });

  const data = {
    labels: [
      "Мужчины с аритмией",
      "Женщины с аритмией",
      "Мужчины без аритмии",
      "Женщины без аритмии",
    ],
    datasets: [
      {
        data: [
          menWithArrhythmia,
          womenWithArrhythmia,
          menWithoutArrhythmia,
          womenWithoutArrhythmia,
        ],
        backgroundColor: [
          "#e57373", // Red for men with arrhythmia
          "#ff8a65", // Orange for women with arrhythmia
          "#81c784", // Green for men without arrhythmia
          "#aed581", // Light green for women without arrhythmia
        ],
        borderColor: [
          "#000", // Black lines for pie slices
          "#000",
          "#000",
          "#000",
        ],
        borderWidth: [
          menWithArrhythmia > 0 ? 2 : 0,
          womenWithArrhythmia > 0 ? 2 : 0,
          menWithoutArrhythmia > 0 ? 2 : 0,
          womenWithoutArrhythmia > 0 ? 2 : 0,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: {
            size: 12,
            family: "Arial",
            weight: "bold" as const,
          },
          color: "#4F4F4F",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#ffffff",
        titleColor: "#333",
        bodyColor: "#4F4F4F",
        borderColor: "#e0e0e0",
        borderWidth: 1,
        titleFont: {
          size: 14,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
      },
      datalabels: {
        display: true,
        formatter: (value: number | null, context: any) => {
          const total = (context.dataset.data as (number | null)[]).reduce((sum, val) => (sum || 0) + (val || 0), 0) || 0;
          if (total === 0 || value === null) return "";
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        font: {
          size: 12,
          weight: "bold" as const,
        },
        color: "#333",
      },
    },
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">Распределение состояний (Пирог)</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default GraphFive;