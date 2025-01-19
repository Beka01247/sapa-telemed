import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./GraphTwo.css";

interface ECGData {
  ecgDescription: string;
}

interface GraphTwoProps {
  ecgData: ECGData[];
}

const GraphTwo: React.FC<GraphTwoProps> = ({ ecgData }) => {
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    if (!ecgData) return;
    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    // We define all the conditions or parse them from the description:
    const rhythmCounts: Record<string, number> = {
      "AV блокада": 0,
      БНП: 0,
      "Синусовая брадикардия": 0,
      "Синусовая тахикардия": 0,
      ФП: 0,
      Экстрасистолы: 0,
      CLC: 0,
      "Синдром WPW": 0,
      LongQT: 0,
      "Пароксизмальная ЖТ": 0,
      "Пароксизмальная НЖТ": 0,
    };

    data.forEach((record) => {
      const desc = record.ecgDescription.toLowerCase();

      Object.keys(rhythmCounts).forEach((condition) => {
        if (desc.includes(condition.toLowerCase())) {
          rhythmCounts[condition]++;
        }
      });
    });

    const totalCases = Object.values(rhythmCounts).reduce((sum, count) => sum + count, 0);
    const labels = Object.keys(rhythmCounts);
    const counts = Object.values(rhythmCounts);

    setGraphData({
      labels: labels.map((label, i) => {
        const percentage = totalCases
          ? ((counts[i] / totalCases) * 100).toFixed(1)
          : 0;
        return `${label} (${percentage}%)`;
      }),
      datasets: [
        {
          label: "Нарушения ритма сердца",
          data: counts,
          backgroundColor: "#1E88E5",
        },
      ],
    });
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">Нарушения ритма сердца</h2>

      {!ecgData.length ? (
        <p className="no-data-label">Нет данных для отображения.</p>
      ) : !graphData ? (
        <p>Обработка данных...</p>
      ) : (
        <div className="graph-display">
          <Bar
            data={graphData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Количество случаев",
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GraphTwo;
