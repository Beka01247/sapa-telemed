import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./GraphFive.css";

interface ECGData {
  ecgDate: string;
  ecgDescription: string;
  sex: string;
}

interface GraphFiveProps {
  ecgData: ECGData[];
}

const GraphFive: React.FC<GraphFiveProps> = ({ ecgData }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (!ecgData) return;
    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    const counts = {
      women: { withArrhythmia: 0, withoutArrhythmia: 0 },
      men: { withArrhythmia: 0, withoutArrhythmia: 0 },
    };

    data.forEach((record) => {
      const hasArrhythmia = record.ecgDescription.toLowerCase().includes("аритмия");
      const isFemale = record.sex.toLowerCase() === "жен";
      const isMale = record.sex.toLowerCase() === "муж";

      if (isFemale) {
        hasArrhythmia ? counts.women.withArrhythmia++ : counts.women.withoutArrhythmia++;
      } else if (isMale) {
        hasArrhythmia ? counts.men.withArrhythmia++ : counts.men.withoutArrhythmia++;
      }
    });

    setChartData({
      labels: [
        "Женщины без аритмии",
        "Женщины с аритмией",
        "Мужчины без аритмии",
        "Мужчины с аритмией",
      ],
      datasets: [
        {
          data: [
            counts.women.withoutArrhythmia,
            counts.women.withArrhythmia,
            counts.men.withoutArrhythmia,
            counts.men.withArrhythmia,
          ],
          backgroundColor: ["#ff6384", "#ff6384AA", "#36a2eb", "#36a2ebAA"],
          hoverOffset: 5,
        },
      ],
    });
  };

  return (
    <div className="graph-container-v2">
      <div style={{ textAlign: "center", width: "100%", maxWidth: "500px", margin: "0 auto", height: "400px" }}>
      <h2 className="graph-title">Распределение пола и аритмии</h2>
      {chartData ? (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              datalabels: {
                display: true,
                formatter: (value, context) => {
                  const total = (context.dataset.data as number[])
                    .reduce((sum, val) => (sum ?? 0) + (val ?? 0), 0);
                  if (total === 0) return "";
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${percentage}%`;
                },
                color: "#000",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
            cutout: "0%",
            radius: "100%",
          }}
          plugins={[ChartDataLabels]}
        />
      ) : (
        <p>Обработка данных...</p>
      )}
      </div>
    </div>
  );
};

export default GraphFive;
