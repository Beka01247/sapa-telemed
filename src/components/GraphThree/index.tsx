import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./GraphThree.css";

interface ECGData {
  ecgDescription: string;
}

interface GraphThreeProps {
  ecgData: ECGData[];
}

const GraphThree: React.FC<GraphThreeProps> = ({ ecgData }) => {
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    if (!ecgData) return;
    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    const blockCounts: Record<string, number> = {
      "I ст": 0,
      "II ст": 0,
      "III ст": 0,
    };

    data.forEach((record) => {
      const desc = record.ecgDescription.toLowerCase();
      if (desc.includes("i ст")) blockCounts["I ст"]++;
      if (desc.includes("ii ст")) blockCounts["II ст"]++;
      if (desc.includes("iii ст")) blockCounts["III ст"]++;
    });

    setGraphData({
      labels: Object.keys(blockCounts),
      datasets: [
        {
          label: "Атриовентрикулярная блокада",
          data: Object.values(blockCounts),
          backgroundColor: "#9C27B0", // Purple
        },
      ],
    });
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">АВ-блокада</h2>

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

export default GraphThree;
